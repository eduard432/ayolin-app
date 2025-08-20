import {
	addTool,
	addToolSchema,
	deleteTool,
} from '@/data/chatbot/chatbot.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'

export const POST = ApiErrorHandler.wrapAuth(
	async (request, context, session) => {
		const { chatbotId } = await context.params
		const data = await ApiValidator.validateBody(request, addToolSchema)
		const chatbot = await addTool(data, chatbotId, session.user.id)

		return ApiResponse.updated(chatbot, 'Tool installed')
	}
)

export const DELETE = ApiErrorHandler.wrapAuth(
	async (request, context, session) => {
		const { chatbotId } = await context.params
		const data = await ApiValidator.validateBody(request, addToolSchema)
		const chatbot = await deleteTool(data, chatbotId, session.user.id)
		return ApiResponse.updated(chatbot, 'Tool uninstalled')
	}
)
