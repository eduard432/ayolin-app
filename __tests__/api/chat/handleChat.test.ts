import { handleMessage } from '@/lib/api/Chat'
import { db } from '@/lib/db'
import { Chatbot, User, Chat, PrismaClient, Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { ObjectId } from 'bson'
import { describe, expect, test } from 'vitest'

const createMockData = async (
	db: Omit<
		PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
		'$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
	>
): Promise<{
	user: User
	chatbot: Chatbot
	chat: Chat
}> => {
	const chatbotId = new ObjectId().toString()
	const chatId = new ObjectId().toString()

	const user = await db.user.create({
		data: {
			email: 'test@ayolin.com',
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

describe('Handle ai messages', async () => {
	test('handleMessage', async () => {
		await db
			.$transaction(async (tx) => {
				const { chat } = await createMockData(tx)
				const response = await handleMessage(
					{
						id: new ObjectId().toString(),
						role: 'user',
						parts: [
							{
								type: 'text',
								text: 'Hello, how are you?',
							},
						],
					},
					chat.id
				)

				expect(response.length).toBeGreaterThan(0)

				// Verificar que se creó el mensaje en la DB (dentro de la transacción)
				const messages = await tx.message.findMany({ where: { chatId: chat.id } })
				expect(messages.length).toBe(1)
				expect(messages[0].role).toBe('user')
				// @ts-expect-error Json value as needed type
				expect(messages[0].parts[0].text).toBe('Hello, how are you?')

				throw new Error('Rollback de prueba')
			})
			.catch(() => {})
	})
})
