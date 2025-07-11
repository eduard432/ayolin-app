import { auth } from '@/lib/auth'
import { createChatBot, createChatbotBodySchema } from '@/data/chatbot.server'
import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { NextResponse } from 'next/server'

// POST: Create a new chatbot:
// /api/chatbot

export const POST = auth(async (request) => {
	try {
		if (!request.auth)
			return NextResponse.json(
				{ message: 'Not authenticated' },
				{ status: 401 }
			)

		const body = await request.json()
		const data = validateWithSource(createChatbotBodySchema, body, 'body')

		const result = await createChatBot({
			...data,
			userId: request.auth.user.id,
		})

		const response = NextResponse

		if (result) {
			return response.json(
				{
					msg: 'ChatBot created',
					chatbot: result,
				},
				{
					status: 201,
				}
			)
		} else {
			return response.json(
				{
					msg: 'Error creating chatbot',
				},
				{
					status: 500,
				}
			)
		}
	} catch (error) {
		return handleApiError(error)
	}
})