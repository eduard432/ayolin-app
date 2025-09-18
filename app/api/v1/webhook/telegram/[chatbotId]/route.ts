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
		try {
			const chatId = ctx.chat?.id
			if (!chatId) {
				await ctx.reply('Error: No se pudo obtener el ID del chat.')
				return
			}

			// Verificar si ya existe el chat
			const existingChat = await db.chat.findFirst({
				where: {
					channelId: chatId.toString(),
					chatbotId: chatbot.id,
				},
			})

			if (existingChat) {
				await ctx.reply(`¡Hola de nuevo! Soy ${name}, tu asistente personalizado.`)
				return
			}

			// Crear nuevo chat
			await db.chat.create({
				data: {
					chatbotId: chatbot.id,
					messages: {
						create: [],
					},
					channelId: chatId.toString(),
					settings: {
						maxBatchReplyDelay: 5000,
					},
					status: {
						pendingMessagesCount: 0,
					},
				},
				include: {
					messages: true,
				},
			})

			// Incrementar contador de chats
			await db.chatbot.update({
				where: { id: chatbot.id },
				data: {
					totalChats: {
						increment: 1,
					},
				},
			})

			await ctx.reply(`¡Hola! Soy ${name}, tu asistente personalizado.`)
		} catch (error) {
			console.error('Error in /start command:', error)
			await ctx.reply('Error al inicializar el chat. Intenta nuevamente.')
		}
	})

	bot.on('message:text', async (ctx) => {
		try {
			const { chatId } = ctx

			const chat = await db.chat.findFirst({
				where: {
					 chatbotId: chatbot.id,
					channelId: chatId.toString(),
				},
				include: {
					messages: {
						orderBy: {
							createdAt: 'desc',
						},
						take: 20,
					},
					chatbot: true,
				},
			})

			if (!chat) {
				await ctx.reply(
					'No se encontró un chat activo. Por favor, inicia un nuevo chat con /start.'
				)
				return 
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

			await ctx.reply(response)
			return
		} catch (error) {
			console.log(error)
			await ctx.reply(
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
		const response = await handleUpdate(request)
		return response
	} catch (error) {
		return handleApiError(error)
	}
}
