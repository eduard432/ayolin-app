import {
	createChatBot,
	createChatbotBodySchema,
} from '@/data/chatbot/chatbot.server'
import { validateMaxChatbot } from '@/data/user/user.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'

export const POST = ApiErrorHandler.wrapAuth(async (request, _, session) => {
	const data = await ApiValidator.validateBody(
		request,
		createChatbotBodySchema
	)
	await validateMaxChatbot(session.user.id)
	await createChatBot({
		...data,
		userId: session.user.id,
	})
	return ApiResponse.created(data)
})
