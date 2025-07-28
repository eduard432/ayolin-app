import { db } from '@/lib/db'
import { Message, Prisma } from '@prisma/client'

export const saveMessages = async (
	messages: Prisma.MessageCreateManyInput[]
) => {
	await db.message.createMany({
		data: messages,
	})
}

export const getMessagesByChatId = async (id: string): Promise<Message[]> => {
	const chatResult = await db.chat.findUnique({
		where: {
			id,
		},
		include: {
			messages: {
				orderBy: { createdAt: 'asc' },
				take: 30,
			},
		},
	})
	if (!chatResult) {
		return []
	}
	return chatResult.messages
}

export const getChatById = async (id: string, maxMessages = 20) => {
	const chatResult = await db.chat.findUnique({
		where: {
			id,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: 'asc',
				},
				take: maxMessages,
			},
			chatbot: true,
		},
	})

	return chatResult
}

type ModelIds = {
	userId: string
	chatbotId: string
	chatId: string
}

type UsageProps = {
	ids: ModelIds
	messages?: number
	usage?: number
	newChats?: number
}

export const updateUsageFields = async ({
	ids,
	messages = 1,
	usage = 0,
	newChats = 0
}: UsageProps) => {
	return await db.$transaction(async (tx) => {
		// 1. Crear usageLog
		const usageLog = await tx.usageLog.create({
			data: {
				chatbotId: ids.chatbotId,
				userId: ids.userId,
				creditUsage: usage,
			},
		})

		// 2. Actualizar chat
		const chat = await tx.chat.update({
			where: {
				id: ids.chatId,
			},
			data: {
				lastActive: new Date(),
				totalMessages: {
					increment: messages,
				},
				creditUsage: {
					increment: usage,
				},
			},
		})

		// 3. Actualizar chatbot
		const chatbot = await tx.chatbot.update({
			where: {
				id: ids.chatbotId,
			},
			data: {
				totalMessages: {
					increment: messages,
				},
				creditUsage: {
					increment: usage,
				},
				usageLogs: {
					connect: {
						id: usageLog.id,
					},
				},
				totalChats: {
					increment: newChats
				}
			},
			include: {
				usageLogs: true, // Si quieres devolverlos
			},
		})

		// 4. Actualizar usuario
		const user = await tx.user.update({
			where: {
				id: ids.userId,
			},
			data: {
				creditUsage: {
					increment: usage,
				},
				usageLogs: {
					connect: {
						id: usageLog.id,
					},
				},
			},
			include: {
				usageLogs: true, // Si quieres devolverlos
			},
		})

		// Retornar todo si lo necesitas
		return {
			usageLog,
			chat,
			chatbot,
			user,
		}
	})
}
