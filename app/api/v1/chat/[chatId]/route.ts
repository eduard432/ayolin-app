import { getChatById, updateUsageFields } from '@/data/chat/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import { convertToModelMessages, generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { ObjectId } from 'bson'
import { saveMessages } from '@/data/chat/chat.server'
import { Prisma } from '@prisma/client'
import { ModelId, modelPrices } from '@/lib/constants/models'
import { db } from '@/lib/db'
import { generateTools } from '@/lib/ai'
import { ApiErrorHandler } from '@/lib/api/ApiError'

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
	} catch (error) {
		return new ChatSDKError('bad_request:api')
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
			return new ChatSDKError('not_found:chat')
		}

		const user = await db.user.findFirst({
			where: {
				id: chat.chatbot.userId,
			},
		})

		if (!user) {
			return new ChatSDKError('not_found:chat')
		}

		let actualMaxUsagePricing = user.maxCreditUsage - user.creditUsage

		const modelPricing = modelPrices[chat.chatbot.model as ModelId]
		const modelInputPricing = modelPricing.input / 1_000_000
		const modelOutputPricing = modelPricing.output / 1_000_000

		let inputTokenUsage = 0
		requestBody.message.parts.forEach((part) => {
			if (part.type === 'text') {
				inputTokenUsage += part.text.length / 4 // Rough estimate: 1 token = 4 characters
			}
		})

		const aproxInputCreditUsage = inputTokenUsage * modelInputPricing
		actualMaxUsagePricing -= aproxInputCreditUsage

		if (actualMaxUsagePricing <= 0) {
			return new ChatSDKError('rate_limit:chat')
		}

		const messages = [
			...convertToUIMessages(chat.messages.slice(-20)),
			message,
		]

		const tools = generateTools(chat.chatbot.tools)

		const result = await generateText({
			model: openai(chat.chatbot.model),
			messages: convertToModelMessages(messages),
			system: chat.chatbot.initialPrompt,
			tools,
			maxOutputTokens: Math.floor(actualMaxUsagePricing / modelOutputPricing),
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

		const inputCreditUsage =
			(result.totalUsage.inputTokens || 0) * modelInputPricing
		const outputCreditUsage =
			(result.totalUsage.outputTokens || 0) * modelOutputPricing

		await updateUsageFields({
			ids: {
				chatId: chat.id,
				chatbotId: chat.chatbot.id,
				userId: chat.chatbot.userId,
			},
			messages: 2,
			usage: inputCreditUsage + outputCreditUsage,
		})

		return NextResponse.json({
			message: generatedMessage,
		})
	} catch (e) {
		console.log(e)
		ApiErrorHandler.handleError(e)
	}
}
