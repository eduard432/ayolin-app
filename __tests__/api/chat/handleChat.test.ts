import { handleMessage } from '@/lib/api/Chat'
import { db } from '@/lib/db'
import { ObjectId } from 'bson'
import { describe, test, it } from 'vitest'

const createMockData = async () => {
    const chatbotId = new ObjectId().toString()
    const chatId = new ObjectId().toString()
    
    const user = await db.user.create({
        data: {

        }
    })

	const chatbot = await db.chatbot.create({
		data: {
			name: 'Test Chatbot',
		},
	})

	const chat = await db.chat.create({
		data: {
			name: '',
		},
	})
}

describe('handleChat API', async () => {
	

	handleMessage({
		id: new ObjectId().toString(),
		role: 'user',
		parts: [
			{
				type: 'text',
				text: 'Hello, how are you?',
			},
		],
	})
})
