import { db } from '@/lib/db'
import { Message, Prisma } from '@prisma/client'

export const saveMessages = async (messages: Prisma.MessageCreateManyInput[]) => {
    await db.message.createMany({
        data: messages 
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
	if (!chatResult) {
		throw new Error('Chat not found')
	}

	return chatResult
}

export const updatedChatFields = async (chatId: string, messages = 1) => {
	await db.chat.update({
			where: {
				id: chatId,
			},
			data: {
				lastActive: new Date(),
				totalMessages: {
					increment: messages
				}
			},
		})
}