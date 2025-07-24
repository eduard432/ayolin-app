import { AI_TOOL_INDEX } from '@/ai_tools'
import { saveMessages } from '@/data/chat.client'
import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { db } from '@/lib/db'
import { convertToUIMessages } from '@/lib/utils'
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
	prevMessages?: Message[]
) => {
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

	await saveMessages([
		{
			chatId: chat.id,
			id: message.id,
			parts: typeof message.parts === 'string' ? JSON.parse(message.parts) : message.parts,
			role: message.role as 'user',
			createdAt: new Date(),
		},
	])

	const messages: UIMessage[] = []

	if (prevMessages) {
		messages.push(...convertToUIMessages(prevMessages))
	}

	messages.push(message)

	const tools = Object.fromEntries(
		chatbot.tools
			.filter((tool) => AI_TOOL_INDEX[tool.keyName])
			.map((tool) => {
				return [tool.keyName, AI_TOOL_INDEX[tool.keyName]]
			})
	)

	const result = await generateText({
		model: openai(chatbot.model),
		messages: convertToModelMessages(messages),
		system: chatbot.initialPrompt,
		tools,
	})

	const generatedMessage: Prisma.MessageCreateManyInput = {
		id: new ObjectId().toString(),
		chatId: chat.id,
		role: 'assistant',
		parts: [
			{
				type: 'text',
				text: result.text,
			},
		],
		createdAt: new Date(),
	}

	await saveMessages([generatedMessage])

	return ctx.reply(result.text)
}

const createChatbotInstance = (token: string, chatbot: Chatbot) => {
	const bot = new Bot(token)

	const { name } = chatbot

	bot.command('start', (ctx) => {
		return ctx.reply(`¡Hola! Soy ${name}, tu asistente personalizado.`)
	})

	bot.on('message:text', async (ctx) => {
		const { chatId } = ctx

		let chat = await db.chat.findFirst({
			where: {
				channelId: chatId.toString(),
			},
			include: {
				messages: {
					orderBy: {
						createdAt: 'asc',
					},
					take: 20
				}
			}
		})

		if (!chat) {
			chat = await db.chat.create({
				data: {
					chatbotId: chatbot.id,
					lastActive: new Date(),
					messages: {
						create: [],
					},
					channelId: chatId.toString()
				},
				include: {
				messages: true
			}
			})
		}

		return handleMessage(chat, chatbot, ctx, chat.messages)
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
