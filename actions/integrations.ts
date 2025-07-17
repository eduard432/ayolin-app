'use server'

import { db } from '@/lib/db'

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
            message: "Tool installed"
        }
	} catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Error installing tool"
        }
    }
}

export const installChannel = async (chatbotId: string,
	channelKeyName: string) => {
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
            message: "Tool installed"
        }
	} catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Error installing tool"
        }
    }
}