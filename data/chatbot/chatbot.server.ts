import { NotFoundError } from '@/lib/api/ApiError'
import { db } from '@/lib/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ObjectId } from 'bson'
import z from 'zod'

export const getChatBotsByUserId = async (userId: string) => {
	const chatbots = await db.chatbot.findMany({
		where: {
			userId,
		},
	})

	return chatbots
}

export const createChatbotBodySchema = z
	.object({
		model: z.string(),
		name: z.string(),
		initialPrompt: z.string(),
	})
	.strict()

export const createChatBot = async (
	data: z.infer<typeof createChatbotBodySchema> & {
		userId: string
	}
) => {
	const { model, name, initialPrompt, userId } = data

	const chatbotId = new ObjectId().toString()

	const chat = await db.chat.create({
		data: {
			chatbotId,
			name: 'Usuario de Prueba',
			lastActive: new Date(),
			messages: {
				create: [],
			},
			settings: {
				maxBatchReplyDelay: 5000, // Default delay for batch replies
			},
			status: {
				pendingMessagesCount: 0,
			},
		},
	})

	const chatbot = await db.chatbot.create({
		data: {
			id: chatbotId,
			model,
			name,
			initialPrompt,
			userId,
			defaultChat: chat.id,
			totalChats: 1,
		},
	})

	return chatbot
}

export const getChatbotById = async (chatbotId: string, userId?: string) => {
	const chatbot = await db.chatbot.findUnique({
		where: {
			id: chatbotId,
			userId,
		},
	})

	if (!chatbot) {
		return new NotFoundError('Chatbot not found')
	}

	return chatbot
}

export const deleteChatbot = async (chatbotId: string, userId?: string) => {
	try {
		await db.chatbot.delete({
			where: {
				id: chatbotId,
				userId,
			},
		})
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const updateChatbotBodySchema = z
	.object({
		name: z.string(),
		model: z.string(),
		initialPrompt: z.string(),
	})
	.strict()

export const updateChatbot = async (
	data: z.infer<typeof updateChatbotBodySchema>,
	chatbotId: string,
	userId?: string
) => {
	try {
		const chatbot = await db.chatbot.update({
			where: {
				id: chatbotId,
				userId,
			},
			data,
		})
		return chatbot
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}
