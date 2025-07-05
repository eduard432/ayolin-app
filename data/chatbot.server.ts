import { db } from '@/lib/db'
import { ObjectId } from 'bson'
import z from 'zod'

export const getChatBotByUserId = async (userId: string) => {
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
                create: []
            }
		},
	})

	const chatbot = await db.chatbot.create({
		data: {
			id: chatbotId,
			model,
			name,
			initialPrompt,
			userId,
			usage: {
				inputTokens: 0,
				outputTokens: 0,
			},
			defaultChat: chat.id,
		},
	})

	return chatbot
}

export const getChatbotById = async (chatbotId: string) => {
	const chatbot = await db.chatbot.findUnique({
		where: {
			id: chatbotId,
		},
	})

	if (!chatbot) {
		return null
	}

	return chatbot
}
