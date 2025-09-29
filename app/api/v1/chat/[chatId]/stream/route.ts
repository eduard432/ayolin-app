import { getChatById } from '@/data/chat/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { JsonToSseTransformStream } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { handleMessage2 } from '@/lib/api/Chat'

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

	try {
		const chat = await getChatById(chatId, {})

		if (!chat) {
			return new ChatSDKError('not_found:chat').toResponse()
		}

		const { stream } = await handleMessage2({
			message,
			chatId,
			streaming: true,
		})
		return new Response(stream.pipeThrough(new JsonToSseTransformStream()))
	} catch (error) {
		console.log(error)
		if (error instanceof ChatSDKError) {
			return error.toResponse()
		} else {
			return new ChatSDKError('bad_request:api').toResponse()
		}
	}
}
