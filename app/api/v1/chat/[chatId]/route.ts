import { getChatById } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import {
	convertToModelMessages,
	createUIMessageStream,
	JsonToSseTransformStream,
	streamText,
} from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { ObjectId } from 'bson'
import { saveMessages } from '@/data/chat.client'
import { JsonValue } from '@prisma/client/runtime/library'

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
	{ params }: { params: { chatId: string } }
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
			createdAt: new Date(),
		},
	])

	try {
		const chat = await getChatById(chatId)
		const messages = [...convertToUIMessages(chat.messages), message]

		const stream = createUIMessageStream({
			execute: ({ writer: dataStream }) => {
				const result = streamText({
					model: openai(chat.chatbot.model),
					messages: convertToModelMessages(messages),
					system: chat.chatbot.initialPrompt,
				})

				result.consumeStream()

				dataStream.merge(result.toUIMessageStream())
			},
			generateId: () => new ObjectId().toString(),

			onFinish: ({ messages }) => {
				saveMessages(
					messages.map((uiMessage) => ({
						id: uiMessage.id,
						chatId,
						parts: uiMessage.parts as JsonValue[],
						role: uiMessage.role,
						createdAt: new Date(),
					}))
				)
			},
		})

		return new Response(stream.pipeThrough(new JsonToSseTransformStream()))
	} catch (e) {
		console.log(e)
		return new ChatSDKError('forbidden:chat').toResponse()
	}
}
