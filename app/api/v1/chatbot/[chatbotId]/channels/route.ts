import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Bot } from 'grammy'

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
						const endpoint = `${process.env.HOSTNAME_URL}/api/v1/webhook/telegram/${chatbot.id}`
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
		} catch (error) {
			return handleApiError(error)
		}
	}
)
