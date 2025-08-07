import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Bot } from 'grammy'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { DOMAIN_URL } from '@/lib/utils'

const addChannelSchema = z.discriminatedUnion('keyName', [
	z
		.object({
			keyName: z.literal('telegram'),
			settings: z.object({
				token: z.string().min(1),
			}),
		})
		.strict(),
	z
		.object({
			keyName: z.literal('wa'),
			settings: z.record(z.string(), z.any()),
		})
		.strict(),
])

export const POST = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			if (!request.auth) {
				return NextResponse.json(
					{ message: 'Not authenticated' },
					{ status: 401 }
				)
			}

			const { chatbotId } = await params

			const body = await request.json()
			const { keyName, settings } = validateWithSource(
				addChannelSchema,
				body,
				'body'
			)

			const chatbot = await db.chatbot.findFirst({
				where: {
					id: chatbotId,
					userId: request.auth.user.id,
				},
			})

			if (!chatbot) {
				return NextResponse.json(
					{ message: 'Chatbot not found' },
					{ status: 404 }
				)
			}

			// Código específicio para cada canal:
			switch (keyName) {
				case 'telegram':
					try {
						const bot = new Bot(settings.token)
						const endpoint = `${DOMAIN_URL}/api/v1/webhook/telegram/${chatbot.id}`
						await bot.api.setWebhook(endpoint)
					} catch (error) {
						console.log(error)
						return NextResponse.json(
							{ message: 'Error in webhook setup' },
							{ status: 500 }
						)
					}
					break

				default:
					return NextResponse.json(
						{ message: 'Channel not found' },
						{ status: 500 }
					)
			}

			const chatbotUpdated = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					channels: {
						push: {
							keyName,
							settings,
						},
					},
				},
			})

			if (!chatbotUpdated)
				return NextResponse.json(
					{ message: 'Error adding channel' },
					{ status: 500 }
				)

			return NextResponse.json(
				{ message: 'Channel added successfully', chatbot: chatbotUpdated },
				{ status: 200 }
			)
		} catch (error) {
			return handleApiError(error)
		}
	}
)

const removeChannelSchema = z.object({
	keyName: z.string(),
})

export const DELETE = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			const body = await request.json()
			const { keyName } = validateWithSource(removeChannelSchema, body, 'body')

			const chatbot = await db.chatbot.findFirst({
				where: {
					id: chatbotId,
				},
			})

			if (!chatbot) {
				return NextResponse.json(
					{ message: 'Chatbot not found' },
					{ status: 404 }
				)
			}

			switch (keyName) {
				case 'telegram':
					try {
						const channel = chatbot.channels.find(
							(channel) => channel.keyName === 'telegram'
						)

						
						if (!channel) {
							return NextResponse.json(
								{ message: 'Channel not installed' },
								{ status: 400 }
							)
						}
						const { token } = channel.settings as {token: string} 

						const bot = new Bot(token)
						await bot.api.deleteWebhook()
					} catch (error) {
						console.log(error)
						return NextResponse.json(
							{ message: 'Error in webhook setup' },
							{ status: 500 }
						)
					}
					break

				default:
					return NextResponse.json(
						{ message: 'Channel not found' },
						{ status: 500 }
					)
			}

			const newChannels = chatbot.channels.filter((channel) => channel.keyName !== keyName) as { keyName: string; settings: InputJsonValue }[]

			const updatedChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					channels: {
						set: newChannels
					},
				},
			})

			return NextResponse.json({
				message: 'Channel removed',
				ok: true,
                chatbot: updatedChatbot
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)
