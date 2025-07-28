import { getChatById, updateUsageFields } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import { convertToModelMessages, generateText } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { ObjectId } from 'bson'
import { saveMessages } from '@/data/chat.server'
import { AI_TOOL_INDEX } from '@/ai_tools'
import { Prisma } from '@prisma/client'
import { ModelId, modelPrices } from '@/lib/constants/models'
import { db } from '@/lib/db'

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

	try {
		const { message } = requestBody

		await saveMessages([
			{
				chatId,
				id: message.id,
				parts: message.parts,
				role: message.role,
			},
		])

		const chat = await getChatById(chatId)

		if (!chat) {
			return new ChatSDKError('not_found:chat').toResponse()
		}

		const user = await db.user.findFirst({
			where: {
				id: chat.chatbot.userId,
			},
		})

		if (!user) {
			return new ChatSDKError('not_found:chat').toResponse()
		}

		if (user.creditUsage >= user.maxCreditUsage) {
			return new ChatSDKError('rate_limit:chat').toResponse()
		}

		const messages = [
			...convertToUIMessages(chat.messages.slice(-20)),
			message,
		]

		const tools = Object.fromEntries(
			chat.chatbot.tools
				.filter((tool) => AI_TOOL_INDEX[tool.keyName])
				.map((tool) => {
					return [tool.keyName, AI_TOOL_INDEX[tool.keyName]]
				})
		)

		const result = await generateText({
			model: openai(chat.chatbot.model),
			messages: convertToModelMessages(messages),
			system: chat.chatbot.initialPrompt,
			tools,
		})

		const generatedMessage: Prisma.MessageCreateManyInput = {
			id: new ObjectId().toString(),
			chatId,
			role: 'assistant',
			parts: [
				{
					type: 'text',
					text: result.text,
				},
			],
		}

		await saveMessages([generatedMessage])

		

		const modelPricing = modelPrices[(chat.chatbot.model as ModelId)]
			
		const inputCreditUsage =
			(result.totalUsage.inputTokens || 0) * (modelPricing.input / 1_000_000)
		const outputCreditUsage =
			(result.totalUsage.outputTokens || 0) * (modelPricing.output / 1_000_000)

		await updateUsageFields(
			{
				chatId: chat.id,
				chatbotId: chat.chatbot.id,
				userId: chat.chatbot.userId,
			},
			2,
			inputCreditUsage + outputCreditUsage
		)

		return Response.json({
			message: generatedMessage,
		})
	} catch (e) {
		console.log(e)
		return new ChatSDKError('forbidden:chat').toResponse()
	}
}
