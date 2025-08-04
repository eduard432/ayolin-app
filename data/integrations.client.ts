import { Channel, Chatbot, ToolFunction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const addTool = async ({
	keyName,
	chatbotId,
}: {
	keyName: string
	chatbotId: string
}) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}/tools`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keyName,
		}),
	})

	if (!response.ok) {
		throw new Error('Failed to add tool')
	}

	const data: { message: string; ok: boolean; chatbot: Chatbot } =
		await response.json()

	return data
}

export const removeTool = async ({
	keyName,
	chatbotId,
}: {
	keyName: string
	chatbotId: string
}) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}/tools`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keyName,
		}),
	})

	if (!response.ok) {
		throw new Error('Failed to remove tool')
	}

	const data: { message: string; ok: boolean; chatbot: Chatbot } =
		await response.json()

	return data
}

export const createChannel = async ({
	keyName,
	settings,
	chatbotId,
}: {
	settings: Record<string, string>
	keyName: string
	chatbotId: string
}) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}/channels`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keyName,
			settings,
		}),
	})

	if (!response.ok) {
		throw new Error('Failed to create channel')
	}

	const data = await response.json()
	return data.channel as Chatbot
}

export const removeChannel = async ({
	keyName,
	chatbotId,
}: {
	keyName: string
	chatbotId: string
}) => {
	const response = await fetch(`/api/v1/chatbot/${chatbotId}/channels`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keyName,
		}),
	})

	if (!response.ok) {
		throw new Error('Failed to delete channel')
	}

	const data = await response.json()
	return data.chatbot as { message: string; ok: boolean; chatbot: Chatbot }
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

export const getIntegrations = async (): Promise<(ToolFunction | Channel)[]> => {
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
