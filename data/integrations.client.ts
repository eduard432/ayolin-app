import { Channel, Chatbot, ToolFunction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const createChannel = async ({ token, keyName, chatbotId }: { token: string, keyName: string, chatbotId: string }) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}/channels`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keyName: 'telegram',
			settings: { token },
		}),
	})

	if (!response.ok) {
		throw new Error('Failed to create channel')
	}

	const result = await response.json()
	return result.channel as Chatbot
}

export const getToolFunctions = async (): Promise<ToolFunction[]> => {
	const res = await fetch('/api/v1/tools')
	const data: { toolFunctions: ToolFunction[] } = await res.json()

	return data.toolFunctions
}

export const getChannels = async (): Promise<Channel[]> => {
	const res = await fetch('/api/v1/channels')
	const data: { channels: Channel[] } = await res.json()

	return data.channels
}

export const getIntegrations = async () => {
	const data = await Promise.allSettled([getToolFunctions(), getChannels()])

	const res: (ToolFunction | Channel)[] =
		data[0].status === 'fulfilled' && data[1].status === 'fulfilled'
			? [...data[0].value, ...data[1].value]
			: []

	return res
}

export const useIntegrations = () => {
	return useQuery({
		queryKey: ['tools', 'channels', 'allIntegrations'],
		queryFn: () => getIntegrations(),
		refetchOnWindowFocus: false,
	})
}
