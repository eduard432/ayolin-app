import { getChatsByChatbotId } from '@/data/chat/chat.server'
import { getChatbotById } from '@/data/chatbot/chatbot.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'

export const GET = ApiErrorHandler.wrapAuth(
	async (_, context, session) => {
		const { chatbotId } = await context.params
		const chatbot = await getChatbotById(chatbotId, session.user.id)
		const chats = await getChatsByChatbotId(chatbot.id)

		return ApiResponse.success({ chats })
	}
)
