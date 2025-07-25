'use server'

import { db } from '@/lib/db'
import { Chatbot } from '@prisma/client'
import { InputJsonValue } from '@prisma/client/runtime/library'

export const installToolFunction = async (
	chatbotId: string,
	toolKeyName: string
) => {
	try {
		await db.chatbot.update({
			where: {
				id: chatbotId,
			},
			data: {
				tools: {
					push: {
						keyName: toolKeyName,
						settings: {},
					},
				},
			},
		})
		return {
			error: false,
			message: 'Tool installed',
		}
	} catch (error) {
		console.log(error)
		return {
			error: true,
			message: 'Error installing tool',
		}
	}
}

export const removeToolFunction = async (
	chatbot: Chatbot,
	toolKeyName: string
) => {
	try {
		const newTools = chatbot.tools.filter(
			(tool) => tool.keyName !== toolKeyName
		) as { keyName: string; settings: InputJsonValue }[]

		await db.chatbot.update({
			where: {
				id: chatbot.id,
			},
			data: {
				tools: {
					set: newTools,
				},
			},
		})
		return {
			error: false,
			message: 'Tool removed',
		}
	} catch (error) {
		console.log(error)
		return {
			error: true,
			message: 'Error removing tool',
		}
	}
}

export const installChannel = async (
	chatbotId: string,
	channelKeyName: string
) => {
	try {
		await db.chatbot.update({
			where: {
				id: chatbotId,
			},
			data: {
				channels: {
					push: {
						keyName: channelKeyName,
						settings: {},
					},
				},
			},
		})
		return {
			error: false,
			message: 'Tool installed',
		}
	} catch (error) {
		console.log(error)
		return {
			error: true,
			message: 'Error installing tool',
		}
	}
}
