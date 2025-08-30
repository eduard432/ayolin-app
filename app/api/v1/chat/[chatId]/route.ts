import { ChatSDKError } from '@/lib/api/chatError'
import { validateWithSource } from '@/lib/api/validate'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { handleMessage, messageSchema } from '@/lib/api/Chat'
import { ApiResponse } from '@/lib/api/ApiResponse'

const bodySchema = z.object({
	message: messageSchema,
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
	} catch (error) {
		console.log(error)
		return new ChatSDKError('bad_request:api').toResponse()
	}

	try {
		const { message } = requestBody
		const response = await handleMessage({
			chatId,
			message
		})

		return ApiResponse.success({
			response
		})

	} catch (e) {
		console.log(e)
		ApiErrorHandler.handleError(e)
	}
}
