import { NextResponse } from 'next/server'
import { handleApiError } from '@/lib/api/handleError'
import { getChatBotByUserId } from '@/data/chatbot.server'
import { auth } from '@/lib/auth'

// GET: Get all chatbots from user:
// /api/v2/users/:userId/chatbots

export const GET = auth(async (request) => {
	try {
		if (!request.auth)
			return NextResponse.json(
				{ message: 'Not authenticated' },
				{ status: 401 }
			)

		const result = await getChatBotByUserId(request.auth.user.id)

		return NextResponse.json({
			chatbots: result,
		})
	} catch (error) {
		return handleApiError(error)
	}
})
