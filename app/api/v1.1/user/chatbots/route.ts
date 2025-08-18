import { getChatBotsByUserId } from '@/data/chatbot/chatbot.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'

export const GET = ApiErrorHandler.wrapAuth(async (_, __, session) => {
	const chatbots = await getChatBotsByUserId(session.user.id)
	return ApiResponse.success(chatbots)
})
