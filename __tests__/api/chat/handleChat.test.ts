import { handleMessage } from '@/lib/api/Chat'
import { db } from '@/lib/db'
import { Chatbot, User, Chat } from '@prisma/client'
import { ObjectId } from 'bson'
import { describe, expect, test } from 'vitest'

const createMockData = async (): Promise<{
	user: User
	chatbot: Chatbot
	chat: Chat
}> => {
	const chatbotId = new ObjectId().toString()
	const chatId = new ObjectId().toString()

	const user = await db.user.create({
		data: {
			email: `${new ObjectId().toString()}test@test_ayolin.com`,
			name: 'Test User',
		},
	})

	const chatbot = await db.chatbot.create({
		data: {
			name: 'Test Chatbot',
			defaultChat: chatId,
			initialPrompt: 'Eres un chatbot que ayuda con cosas en general',
			model: 'gpt-5-nano',
			userId: user.id,
			id: chatbotId,
		},
	})

	const chat = await db.chat.create({
		data: {
			chatbotId,
			id: chatId,
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

	return { user, chatbot, chat }
}

const deleteMockData = async ({
	chatId,
	chatbotId,
	userId,
}: {
	chatId?: string
	chatbotId?: string
	userId?: string
}) => {
	try {
		if (userId) {
			await db.user.delete({
				where: {
					id: userId,
				},
			})
		} else if (chatbotId) {
			await db.chatbot.delete({
				where: {
					id: chatbotId,
				},
			})
		} else if (chatId) {
			await db.chat.delete({
				where: {
					id: chatId,
				},
			})
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

describe('Handle ai messages', () => {
	test('handleMessage', async () => {
		const { chat, chatbot, user } = await createMockData()

		try {
			const response = await handleMessage({
				message: {
					id: new ObjectId().toString(),
					role: 'user',
					parts: [
						{
							type: 'text',
							text: 'Hello, how are you?',
						},
					],
				},
				chatId: chat.id,
			})

			console.log(response)

			expect(response.length).toBeGreaterThan(0)

			// Verificar que se creó el mensaje en la DB (dentro de la transacción)
			const messages = await db.message.findMany({
				where: { chatId: chat.id },
			})
			expect(messages.length).toBeGreaterThan(2)
			expect(messages[0].role).toBe('user')
			expect(messages.at(-1)?.role).toBe('system')
			// @ts-expect-error Json value as needed type
			expect(messages[0].parts[0].text).toBe('Hello, how are you?')
		} catch (error) {
			console.log(error)
		}

		const deleteResult = await deleteMockData({
			chatbotId: chatbot.id,
			userId: user.id,
			chatId: chat.id,
		})
		expect(deleteResult).toBe(true)
	}, 20_000)
})
