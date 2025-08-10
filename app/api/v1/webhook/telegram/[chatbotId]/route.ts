import { saveMessages, updateUsageFields } from '@/data/chat.server'
import { generateTools } from '@/lib/ai'
import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { ModelId, modelPrices } from '@/lib/constants/models'
import { db } from '@/lib/db'
import { convertToUIMessages, sleep } from '@/lib/utils'
import { openai } from '@ai-sdk/openai'
import { Chat, Chatbot, Message, Prisma } from '@prisma/client'
import { convertToModelMessages, generateText, UIMessage } from 'ai'
import { ObjectId } from 'bson'
import { Bot, Context, webhookCallback } from 'grammy'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const handleMessage = async (
	chat: Chat,
	chatbot: Chatbot,
	ctx: Context & { message: { text: string } },
) => {
	try {
		const message: UIMessage = {
			id: new ObjectId().toString(),
			role: 'user',
			parts: [
				{
					type: 'text',
					text: ctx.message.text,
				},
			],
		}

		// 1. Guardar mensaje del usuario
		await saveMessages([
			{
				chatId: chat.id,
				id: message.id,
				parts: Array.isArray(message.parts)
					? message.parts
					: JSON.parse(message.parts),
				role: 'user',
				createdAt: new Date(),
			},
		])

		// 2. Incrementar pendingMessagesCount (Mongo: reescribir objeto embebido)
		await db.chat.update({
			where: { id: chat.id },
			data: {
				status: {
					pendingMessagesCount: (chat.status?.pendingMessagesCount ?? 0) + 1,
				},
			},
		})

		// 3. Simular tiempo de espera antes de procesar
		await sleep(chat.settings.maxBatchReplyDelay || 5000)

		// 4. Obtener chat actualizado con últimos mensajes
		const newChat = await db.chat.findFirst({
			where: { id: chat.id },
			include: {
				messages: {
					orderBy: { createdAt: 'asc' },
					take: 20,
				},
			},
		})

		if (!newChat || newChat.status.pendingMessagesCount === 0) {
			return
		}

		// 5. Preparar historial de mensajes
		const messages: UIMessage[] = convertToUIMessages(newChat.messages)

		// 6. Generar herramientas
		const tools = generateTools(chatbot.tools)

		// 7. Llamar a modelo
		const result = await generateText({
			model: openai(chatbot.model),
			messages: convertToModelMessages(messages),
			system: chatbot.initialPrompt,
			tools,
		})

		// 8. Guardar mensaje del asistente
		const generatedMessage: Prisma.MessageCreateManyInput = {
			id: new ObjectId().toString(),
			chatId: chat.id,
			role: 'assistant',
			parts: [{ type: 'text', text: result.text }],
			createdAt: new Date(),
		}

		await saveMessages([generatedMessage])

		// 9. Calcular uso de créditos
		const modelPricing = modelPrices[chatbot.model as ModelId]
		const inputCreditUsage =
			(result.totalUsage.inputTokens || 0) * (modelPricing.input / 1_000_000)
		const outputCreditUsage =
			(result.totalUsage.outputTokens || 0) * (modelPricing.output / 1_000_000)

		// 10. Actualizar uso y estadísticas
		await updateUsageFields({
			ids: {
				chatId: chat.id,
				chatbotId: chatbot.id,
				userId: chatbot.userId,
			},
			messages: 2,
			usage: inputCreditUsage + outputCreditUsage,
		})

		// 11. Responder al usuario
		return ctx.reply(result.text)
	} catch (error) {
		console.log(error)
		ctx.reply(
			'Ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.'
		)
	}
}

const createChatbotInstance = (token: string, chatbot: Chatbot) => {
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
		return ctx.reply(`¡Hola! Soy ${name}, tu asistente personalizado.`)
	})

	bot.on('message:text', async (ctx) => {
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
			},
		})

		if (!chat) {
			return ctx.reply(
				'No se encontró un chat activo. Por favor, inicia un nuevo chat con /start.'
			)
		}

		return handleMessage(chat, chatbot, ctx)
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

		const bot = createChatbotInstance(token, chatbot)

		const handleUpdate = webhookCallback(bot, 'std/http')
		return await handleUpdate(request)
	} catch (error) {
		return handleApiError(error)
	}
}
