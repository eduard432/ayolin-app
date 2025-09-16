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
import { convertToModelMessages, generateText, stepCountIs } from 'ai'
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

	let actualMaxUsagePricing = user.maxCreditUsage - user.creditUsage

	const modelPricing = modelPrices[chat.chatbot.model as ModelId]
	const modelInputPricing = modelPricing.input / 1_000_000
	const modelOutputPricing = modelPricing.output / 1_000_000

	let inputTokenUsage = 0
	message.parts.forEach((part) => {
		if (part.type === 'text') {
			inputTokenUsage += part.text.length / 4 // Rough estimate: 1 token = 4 characters
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
		stopWhen: stepCountIs(5)
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
