import { Chatbot } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

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

export const deleteChatbot = async (chatbotId: string) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}`)

	if (!response.ok) {
		throw new Error('Failed to delete chatbot')
	}

	return {
		message: "Chatbot deleted",
		ok: true
	}
}

export const getChatbots = async (userId: string) => {
	console.log('getChatBots called with userId:', userId)
	const res = await fetch(`/api/v1/user/${userId}/chatbots`)
	const data: { chatbots: Chatbot[] } = await res.json()

	return data.chatbots
}

export const useChatbots = (userId: string) => {
	return useQuery({
		queryKey: ['chatbots', userId],
		queryFn: () => getChatbots(userId),
		enabled: !!userId,
		refetchOnWindowFocus: false,
	})
}

export const getChatbot = async (chatbotId: string) => {
	const res = await fetch(`/api/v1/chatbot/${chatbotId}`)
	const data: { chatbot: Chatbot } = await res.json()

	if (!data.chatbot) {
		throw new Error('Chatbot not found')
	}
	return data.chatbot
}

export const useChatbot = (chatbotId: string) => {
	return useQuery({
		queryKey: ["chatbot", chatbotId],
		queryFn: () => getChatbot(chatbotId),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 1 // 1 minuto
	})
}
