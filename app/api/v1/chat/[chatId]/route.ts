import { getChatById } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { convertToUIMessages } from '@/lib/utils'
import { convertToModelMessages, streamText } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'

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
		console.log({chatId})
		if (!chatId) throw Error('chatId is needed')

		console.log({body})

		requestBody = validateWithSource(bodySchema, body, 'body')
	} catch {
		return new ChatSDKError('bad_request:api').toResponse()
	}

	const { message } = requestBody

	try {
		const chat = await getChatById(chatId)
		const messages = [...convertToUIMessages(chat.messages), message]

		const result = streamText({
			model: openai(chat.chatbot.model),
			messages: convertToModelMessages(messages),
		})

		return result.toUIMessageStreamResponse()
	} catch (e) {
		console.log(e)
		return new ChatSDKError('forbidden:chat').toResponse()
	}
}
