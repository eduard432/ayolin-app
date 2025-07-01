import { Chatbot } from "@prisma/client"

type ChatBotInputData = {
	name: string
	initialPrompt: string
	model: string
}

export const createChatbot = async (data: ChatBotInputData) => {
	const response = await fetch('/api/v1/chatbot', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) throw new Error('Failed to create chatbot')

	const result = await response.json()
	return result.chatbot as Chatbot
}
