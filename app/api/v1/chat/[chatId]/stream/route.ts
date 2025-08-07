import { getChatById, updateUsageFields } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import {
	convertToModelMessages,
	createUIMessageStream,
	JsonToSseTransformStream,
	LanguageModelUsage,
	stepCountIs,
	streamText,
} from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { ObjectId } from 'bson'
import { saveMessages } from '@/data/chat.server'
import { Prisma } from '@prisma/client'
import { ModelId, modelPrices } from '@/lib/constants/models'
import { generateTools } from '@/lib/ai'

const textPartSchema = z.object({
	type: z.enum(['text']),
	text: z.string().min(1).max(2000),
})

const filePartSchema = z.object({
	type: z.enum(['file']),
	mediaType: z.enum(['image/jpeg', 'image/png']),
	name: z.string().min(1).max(100),
	url: z.string().url(),
})

const partSchema = z.union([textPartSchema, filePartSchema])

const bodySchema = z.object({
	message: z.object({
		id: z.string(),
		role: z.enum(['user']),
		parts: z.array(partSchema),
	}),
})

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ chatId: string }> }
) {
	let requestBody: z.infer<typeof bodySchema>
	let chatId: string

	try {
		const body = await req.json()
		chatId = (await params).chatId
		if (!chatId) throw Error('chatId is needed')

		requestBody = validateWithSource(bodySchema, body, 'body')
	} catch {
		return new ChatSDKError('bad_request:api').toResponse()
	}

	const { message } = requestBody

	await saveMessages([
		{
			chatId,
			id: message.id,
			parts: message.parts,
			role: message.role,
			createdAt: new Date(),
		},
	])

	try {
		const chat = await getChatById(chatId)

		if (!chat) {
			return new ChatSDKError('not_found:chat').toResponse()
		}

		const messages = [...convertToUIMessages(chat.messages), message]

		const tools = generateTools(chat.chatbot.tools)

		let resultTokens: Promise<LanguageModelUsage>
		const stream = createUIMessageStream({
			execute: async ({ writer: dataStream }) => {
				const result = streamText({
					model: openai(chat.chatbot.model),
					messages: convertToModelMessages(messages),
					system: chat.chatbot.initialPrompt,
					tools,
					stopWhen: stepCountIs(3),
				})

				resultTokens = result.totalUsage

				result.consumeStream()

				dataStream.merge(result.toUIMessageStream())
			},
			generateId: () => new ObjectId().toString(),

			onFinish: async ({ messages }) => {
				const generatedMessages: Prisma.MessageCreateManyInput[] =
					messages.map((uiMessage) => ({
						id: uiMessage.id,
						chatId,
						parts:
							typeof uiMessage.parts === 'string'
								? JSON.parse(uiMessage.parts)
								: uiMessage.parts,
						role: uiMessage.role,
					}))
				saveMessages(generatedMessages)

				const totalTokens = await resultTokens

				const modelPricing = modelPrices[chat.chatbot.model as ModelId]
				const inputCreditUsage =
					(totalTokens.inputTokens || 0) * (modelPricing.input / 1_000_000)
				const outputCreditUsage =
					(totalTokens.outputTokens || 0) * (modelPricing.output / 1_000_000)

				await updateUsageFields({
					ids: {
						chatId: chat.id,
						chatbotId: chat.chatbot.id,
						userId: chat.chatbot.userId,
					},
					messages: 2,
					usage: inputCreditUsage + outputCreditUsage,
				})
			},
		})

		return new Response(stream.pipeThrough(new JsonToSseTransformStream()))
	} catch (e) {
		console.log(e)
		return new ChatSDKError('forbidden:chat').toResponse()
	}
}
