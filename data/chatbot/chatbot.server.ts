import { NotFoundError } from '@/lib/api/ApiError'
import { db } from '@/lib/db'
import { DOMAIN_URL } from '@/lib/utils'
import { Chatbot } from '@prisma/client'
import {
	Prisma
} from '@prisma/client'
import { ObjectId } from 'bson'
import { Bot } from 'grammy'
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
		throw new NotFoundError('Chatbot not found')
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const addChannelSchema = z.discriminatedUnion('keyName', [
	z
		.object({
			keyName: z.literal('telegram'),
			settings: z.object({
				token: z.string().min(1),
			}),
		})
		.strict(),
	z
		.object({
			keyName: z.literal('wa'),
			settings: z.record(z.string(), z.any()),
		})
		.strict(),
])

export const addChannel = async (
	data: z.infer<typeof addChannelSchema>,
	chatbotId: string,
	userId?: string
) => {
	// Implement the logic to add a channel based on the keyName and settings
	switch (data.keyName) {
		case 'telegram':
			try {
				const bot = new Bot(data.settings.token)
				const endpoint = `${DOMAIN_URL}/api/v1/webhook/telegram/${chatbotId}`
				await bot.api.setWebhook(endpoint)
			} catch (error) {
				console.log(error)
				throw new Error('Failed to set Telegram webhook')
			}
			break
		default:
			throw new Error('Unsupported channel type')
	}

	try {
		const chatbot = await db.chatbot.update({
			where: {
				id: chatbotId,
				userId,
			},
			data: {
				channels: {
					push: {
						keyName: data.keyName,
						settings: data.settings,
					},
				},
			},
		})
		return chatbot
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const deleteChannelSchema = z.object({
	keyName: z.string(),
})

export const deleteChannel = async (
	data: z.infer<typeof deleteChannelSchema>,
	chatbotId: string,
	userId: string
): Promise<Chatbot> => {
	const chatbot = await getChatbotById(chatbotId, userId)
	const channel = chatbot.channels.find(
		(channel) => channel.keyName === data.keyName
	)

	if (!channel) {
		throw new NotFoundError('Channel not installed')
	}

	switch (data.keyName) {
		case 'telegram':
			const { token } = channel.settings as { token: string }

			const bot = new Bot(token)
			await bot.api.deleteWebhook()

			break

		default:
			throw new Error('Channel not found')
	}

	try {
		const newChannels = chatbot.channels.filter(
			(channel) => channel.keyName !== data.keyName
		) as { keyName: string; settings: Prisma.InputJsonValue }[]

		const updatedChatbot = await db.chatbot.update({
			where: {
				id: chatbotId,
			},
			data: {
				channels: {
					set: newChannels,
				},
			},
		})
		return updatedChatbot
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const addToolSchema = z.object({
	keyName: z.string(),
	settings: z.record(z.string(), z.any()).optional(),
	fnType: z.enum(['native', 'external'])
})

export const addTool = async (
	data: z.infer<typeof addToolSchema>,
	chatbotId: string,
	userId: string,
) => {
	try {
		const updatedChatbot = await db.chatbot.update({
			where: {
				id: chatbotId,
				userId,
			},
			data: {
				tools: {
					push: {
						keyName: data.keyName,
						settings: data.settings || {},
						fnType: data.fnType
					},
				},
			},
		})

		return updatedChatbot
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const deleteTool = async (
	data: z.infer<typeof addToolSchema>,
	chatbotId: string,
	userId: string
): Promise<Chatbot> => {
	const chatbot = await getChatbotById(chatbotId, userId)
	const tool = chatbot.tools.find((tool) => tool.keyName === data.keyName)

	if (!tool) {
		throw new NotFoundError('Tool not installed')
	}

	try {
		const newTools = chatbot.tools.filter(
			(tool) => tool.keyName !== data.keyName
		) as { keyName: string; settings: Prisma.InputJsonValue, fnType: 'native' | 'external' }[]

		const updatedChatbot = await db.chatbot.update({
			where: {
				id: chatbotId,
				userId,
			},
			data: {
				tools: {
					set: newTools,
				},
			},
		})
		return updatedChatbot
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}
