import { handleMessage } from '@/lib/api/Chat'
import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { db } from '@/lib/db'
import { Chatbot, User } from '@prisma/client'
import { Bot, webhookCallback } from 'grammy'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createChatbotInstance = (
	token: string,
	chatbot: Chatbot,
	user: User
) => {
	const bot = new Bot(token)

	const { name } = chatbot

	bot.command('start', async (ctx) => {
		const { chatId } = ctx

		await db.chat.create({
			data: {
				chatbotId: chatbot.id,
				messages: {
					create: [],
				},
				channelId: chatId.toString(),
				settings: {
					maxBatchReplyDelay: 5000, // Default delay for batch replies
				},
				status: {
					pendingMessagesCount: 0,
				},
			},
			include: {
				messages: true,
			},
		})

		await db.chatbot.update({
			where: { id: chatbot.id },
			data: {
				totalChats: {
					increment: 1,
				},
			},
		})

		return ctx.reply(`¡Hola! Soy ${name}, tu asistente personalizado.`)
	})

	bot.on('message:text', async (ctx) => {
		try {
			const { chatId } = ctx

			const chat = await db.chat.findFirst({
				where: {
					channelId: chatId.toString(),
				},
				include: {
					messages: {
						orderBy: {
							createdAt: 'asc',
						},
						take: 20,
					},
					chatbot: true,
				},
			})

			if (!chat) {
				return ctx.reply(
					'No se encontró un chat activo. Por favor, inicia un nuevo chat con /start.'
				)
			}

			const response = await handleMessage({
				chatId: chat.id,
				message: {
					parts: [
						{
							type: 'text',
							text: ctx.message.text,
						},
					],
					role: 'user',
				},
				chat,
				user,
			})

			return ctx.reply(response)
		} catch (error) {
			console.log(error)
			ctx.reply(
				'Ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.'
			)
		}
	})

	return bot
}

const paramsSchema = z.object({
	chatbotId: z.string().min(1),
})

export const POST = async (
	request: NextRequest,
	{ params: paramsPromise }: { params: Promise<{ chatbotId: string }> }
) => {
	try {
		const params = await paramsPromise

		const { chatbotId } = validateWithSource(paramsSchema, params, 'params')

		const chatbot = await db.chatbot.findFirst({
			where: {
				id: chatbotId,
			},
			include: {
				user: true,
			},
		})

		if (!chatbot) {
			return NextResponse.json(
				{ message: 'Chatbot not found' },
				{ status: 404 }
			)
		}

		const channel = chatbot.channels.find(
			(channel) => channel.keyName === 'telegram'
		)

		if (!channel || !channel.settings) {
			return NextResponse.json(
				{ message: 'Telegram channel not found' },
				{ status: 500 }
			)
		}

		const settings = channel.settings as { token: string }
		const token = settings.token

		const bot = createChatbotInstance(token, chatbot, chatbot.user)

		const handleUpdate = webhookCallback(bot, 'std/http')
		return await handleUpdate(request)
	} catch (error) {
		return handleApiError(error)
	}
}
