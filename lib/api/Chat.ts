import {
	getChatById,
	saveMessages,
	updateUsageFields,
} from '@/data/chat/chat.server'
import { z } from 'zod'
import { ChatSDKError } from './chatError'
import { db } from '../db'
import { ObjectId } from 'bson'
import { Chat, Chatbot, Message, Prisma, User } from '@prisma/client'
import {
	convertToModelMessages,
	createUIMessageStream,
	generateText,
	LanguageModelUsage,
	stepCountIs,
	streamText,
} from 'ai'
import { openai } from '@ai-sdk/openai'
import { generateTools } from '../ai'
import { convertToUIMessages } from '../utils'
import { ModelId, modelPrices } from '../constants/models'

export const textPartSchema = z.object({
	type: z.enum(['text']),
	text: z.string().min(1).max(2000),
})

export const filePartSchema = z.object({
	type: z.enum(['file']),
	mediaType: z.enum(['image/jpeg', 'image/png']),
	name: z.string().min(1).max(100),
	url: z.string().url(),
})

export const partSchema = z.union([textPartSchema, filePartSchema])

const schemaFields = {
	role: z.enum(['user']),
	parts: z.array(partSchema),
}

export const messageSchema = z.object({
	...schemaFields,
})

export const streamMessageSchema = z.object({
	id: z.string(),
	...schemaFields,
})

const getBillingCycleStart = (date: Date, startDay: number): Date => {
	// startDay = día del mes en que empieza el ciclo (ej: 5)
	const year = date.getUTCFullYear()
	const month = date.getUTCMonth()
	const day = date.getUTCDate()

	if (day >= startDay) {
		// ciclo empezó este mes
		return new Date(Date.UTC(year, month, startDay))
	} else {
		// ciclo empezó el mes pasado
		return new Date(Date.UTC(year, month - 1, startDay))
	}
}

const getTotalUsage = async (user: User): Promise<number> => {
	// suponiendo que guardas en user.billingCycleStart el día de inicio (ej: 5)
	const today = new Date()
	const cycleStart = getBillingCycleStart(
		today,
		user.billingCycleStart.getUTCDate()
	)

	const totalUsage = await db.usageLog.aggregate({
		_sum: {
			creditUsage: true,
		},
		where: {
			userId: user.id,
			createdAt: { gte: cycleStart },
		},
	})

	return totalUsage._sum.creditUsage ?? 0
}
type FullChatType = Chat & { chatbot: Chatbot; messages: Message[] }

type HandleMessageData = {
	chat?: FullChatType
	user?: User
	message: z.infer<typeof messageSchema>
	chatId: string
}

export const handleMessage = async ({
	message,
	chatId,
	chat: prevChat,
	user: prevUser,
}: HandleMessageData) => {
	let chat: undefined | null | FullChatType = prevChat
	let user: null | undefined | User = prevUser

	await saveMessages([
		{
			chatId,
			id: new ObjectId().toString(),
			parts: message.parts,
			role: message.role,
		},
	])

	if (!chat) {
		chat = await getChatById(chatId, {})
	}

	if (!chat) {
		throw new ChatSDKError('not_found:chat')
	}

	if (!user) {
		user = await db.user.findFirst({
			where: {
				id: chat.chatbot.userId,
			},
		})
	}

	if (!user) {
		throw new ChatSDKError('not_found:chat')
	}

	const userCreditUsage = await getTotalUsage(user)
	let actualMaxUsagePricing = user.maxCreditUsage - userCreditUsage

	const modelPricing = modelPrices[chat.chatbot.model as ModelId]
	const modelInputPricing = modelPricing.input / 1_000_000
	const modelOutputPricing = modelPricing.output / 1_000_000

	let inputTokenUsage = 0
	message.parts.forEach((part) => {
		if (part.type === 'text') {
			inputTokenUsage += part.text.length / 4
		}
	})

	const aproxInputCreditUsage = inputTokenUsage * modelInputPricing
	actualMaxUsagePricing -= aproxInputCreditUsage

	if (actualMaxUsagePricing <= 0) {
		throw new ChatSDKError('rate_limit:chat')
	}

	const messages = [...convertToUIMessages(chat.messages.slice(-20)), message]

	const tools = generateTools(chat.chatbot.tools)

	const result = await generateText({
		model: openai(chat.chatbot.model),
		messages: convertToModelMessages(messages),
		system: chat.chatbot.initialPrompt,
		tools,
		maxOutputTokens: Math.floor(actualMaxUsagePricing / modelOutputPricing),
		stopWhen: stepCountIs(5),
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
			userId: user.id,
		},
		messages: 2,
		usage: inputCreditUsage + outputCreditUsage,
	})

	return result.text
}

type HandleMessageData2 = {
	chatId: string
	message: z.infer<typeof messageSchema>
	chat?: FullChatType
	user?: User
	streaming?: boolean
}

export async function handleMessage2(
	params: HandleMessageData2 & { streaming: true }
): Promise<{ stream: ReadableStream }>
export async function handleMessage2(
	params: HandleMessageData2 & { streaming: false }
): Promise<{ text: string }>

export async function handleMessage2({
	message,
	chatId,
	chat: prevChat,
	user: prevUser,
	streaming = false,
}: HandleMessageData2) {
	let chat: undefined | null | FullChatType = prevChat
	let user: null | undefined | User = prevUser

	// Save incoming user message
	await saveMessages([
		{
			chatId,
			id: new ObjectId().toString(),
			parts: message.parts,
			role: message.role,
		},
	])

	if (!chat) {
		chat = await getChatById(chatId, {})
	}
	if (!chat) throw new ChatSDKError('not_found:chat')

	if (!user) {
		user = await db.user.findFirst({ where: { id: chat.chatbot.userId } })
	}
	if (!user) throw new ChatSDKError('not_found:auth')

	// ---- Credit Calculation ----
	const userCreditUsage = await getTotalUsage(user)
	let actualMaxUsagePricing = user.maxCreditUsage - userCreditUsage

	const modelPricing = modelPrices[chat.chatbot.model as ModelId]
	const modelInputPricing = modelPricing.input / 1_000_000
	const modelOutputPricing = modelPricing.output / 1_000_000

	let inputTokenUsage = 0
	message.parts.forEach((part) => {
		if (part.type === 'text') {
			inputTokenUsage += part.text.length / 4
		}
	})

	const aproxInputCreditUsage = inputTokenUsage * modelInputPricing
	actualMaxUsagePricing -= aproxInputCreditUsage
	console.log({
		actualMaxUsagePricing,
		aproxInputCreditUsage,
		inputTokenUsage,
		userCreditUsage,
	})
	if (actualMaxUsagePricing <= 0) {
		throw new ChatSDKError('rate_limit:chat')
	}

	const messages = [...convertToUIMessages(chat.messages.slice(-20)), message]
	const tools = generateTools(chat.chatbot.tools)

	// ---- Normal vs Streaming ----
	if (!streaming) {
		const result = await generateText({
			model: openai(chat.chatbot.model),
			messages: convertToModelMessages(messages),
			system: chat.chatbot.initialPrompt,
			tools,
			maxOutputTokens: Math.floor(actualMaxUsagePricing / modelOutputPricing),
			stopWhen: stepCountIs(5),
		})

		const generatedMessage: Prisma.MessageCreateManyInput = {
			id: new ObjectId().toString(),
			chatId,
			role: 'assistant',
			parts: [{ type: 'text', text: result.text }],
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
				userId: user.id,
			},
			messages: 2,
			usage: inputCreditUsage + outputCreditUsage,
		})

		return { text: result.text }
	} else {
		let resultTokens: Promise<LanguageModelUsage>

		const stream = createUIMessageStream({
			execute: async ({ writer }) => {
				const result = streamText({
					model: openai(chat.chatbot.model),
					messages: convertToModelMessages(messages),
					system: chat.chatbot.initialPrompt,
					tools,
					stopWhen: stepCountIs(3),
				})

				resultTokens = result.totalUsage
				result.consumeStream()
				writer.merge(result.toUIMessageStream())
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

				await saveMessages(generatedMessages)

				const totalTokens = await resultTokens
				const inputCreditUsage =
					(totalTokens.inputTokens || 0) * modelInputPricing
				const outputCreditUsage =
					(totalTokens.outputTokens || 0) * modelOutputPricing

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

		return { stream }
	}
}
