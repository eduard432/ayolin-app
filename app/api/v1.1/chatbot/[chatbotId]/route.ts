import {
	deleteChatbot,
	getChatbotById,
	updateChatbot,
	updateChatbotBodySchema,
} from '@/data/chatbot/chatbot.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'

export const GET = ApiErrorHandler.wrapAuth(async (_, context, session) => {
	const { chatbotId } = await context.params
	const chatbot = await getChatbotById(chatbotId, session.user.id)
	return ApiResponse.success(chatbot)
})

export const DELETE = ApiErrorHandler.wrapAuth(async (_, context, session) => {
	const { chatbotId } = await context.params
	await deleteChatbot(chatbotId, session.user.id)
	return ApiResponse.deleted('Chatbot deleted')
})

export const PUT = ApiErrorHandler.wrapAuth(
	async (request, context, session) => {
		const { chatbotId } = await context.params
		const data = await ApiValidator.validateBody(
			request,
			updateChatbotBodySchema
		)
		await updateChatbot(data, chatbotId, session.user.id)
		return ApiResponse.updated(data, 'Chatbot updated')
	}
)
