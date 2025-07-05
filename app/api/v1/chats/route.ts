import { getMessagesByChatId } from '@/data/chat.server'
import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { Message } from '@prisma/client'
import { UIMessage, streamText } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'

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
	id: z.string(),
	message: z.object({
		id: z.string().uuid(),
		role: z.enum(['user']),
		parts: z.array(partSchema),
	}),
})

export async function POST(req: NextRequest) {
	let requestBody: z.infer<typeof bodySchema>

	try {
		const body = await req.json()
		requestBody = validateWithSource(bodySchema, body, 'body')
	} catch {
		return new ChatSDKError('bad_request:api').toResponse()
	}

	const { id, message } = requestBody

	let messagesFromDb: Message[]

	try {
		messagesFromDb = await getMessagesByChatId(id)
	} catch {
		return new ChatSDKError('not_found:chat').toResponse()
	}

	streamText({
		model: '',
		messages: [message]
	})
}
