import { getChatById } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import { convertToModelMessages, generateText } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { ObjectId } from 'bson'
import { saveMessages } from '@/data/chat.server'
import { AI_TOOL_INDEX } from '@/ai_tools'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'

const textPartSchema = z.object({
	type: z.enum(['text']),
	text: z.string().min(1).max(2000),
})

const filePartSchema = z.object({
	type: z.enum(['file']),
	mediaType: z.enum(['image/jpeg', 'image/png']),
	name: z.string().min(1).max(100),
	url: z.string().url(),
})

const partSchema = z.union([textPartSchema, filePartSchema])

const bodySchema = z.object({
	message: z.object({
		id: z.string(),
		role: z.enum(['user']),
		parts: z.array(partSchema),
	}),
})

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ chatId: string }> }
) {
	let requestBody: z.infer<typeof bodySchema>
	let chatId: string

	try {
		const body = await req.json()
		chatId = (await params).chatId
		if (!chatId) throw Error('chatId is needed')

		requestBody = validateWithSource(bodySchema, body, 'body')
	} catch {
		return new ChatSDKError('bad_request:api').toResponse()
	}

	const { message } = requestBody

	await saveMessages([
		{
			chatId,
			id: message.id,
			parts: message.parts,
			role: message.role,
		},
	])

	try {
		const chat = await getChatById(chatId)
		const messages = [
			...convertToUIMessages(chat.messages.slice(-20)),
			message,
		]

		const tools = Object.fromEntries(
			chat.chatbot.tools
				.filter((tool) => AI_TOOL_INDEX[tool.keyName])
				.map((tool) => {
					return [tool.keyName, AI_TOOL_INDEX[tool.keyName]]
				})
		)

		const result = await generateText({
			model: openai(chat.chatbot.model),
			messages: convertToModelMessages(messages),
			system: chat.chatbot.initialPrompt,
			tools,
		})

		const generatedMessage: Prisma.MessageCreateManyInput = {
			id: new ObjectId().toString(),
			chatId,
			role: 'assistant',
			parts: [
				{
					type: 'text',
					text: result.text,
				},
			],
		}

		await saveMessages([generatedMessage])

		await db.chat.update({
			where: {
				id: chat.id,
			},
			data: {
				lastActive: new Date(),
			},
		})

		return Response.json({
			message: generatedMessage,
		})
	} catch (e) {
		console.log(e)
		return new ChatSDKError('forbidden:chat').toResponse()
	}
}
