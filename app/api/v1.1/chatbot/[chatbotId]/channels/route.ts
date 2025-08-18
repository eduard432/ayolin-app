import {
	addChannel,
	addChannelSchema,
	deleteChannel,
	deleteChannelSchema,
} from '@/data/chatbot/chatbot.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'

export const POST = ApiErrorHandler.wrapAuth(
	async (request, context, session) => {
		const { chatbotId } = await context.params
		const data = await ApiValidator.validateBody(request, addChannelSchema)
		await addChannel(data, chatbotId, session.user.id)

		return ApiResponse.updated(data, 'Channel added successfully')
	}
)

export const DELETE = ApiErrorHandler.wrapAuth(
	async (request, context, session) => {
		const { chatbotId } = await context.params
		const data = await ApiValidator.validateBody(request, deleteChannelSchema)
		await deleteChannel(data, chatbotId, session.user.id)
		return ApiResponse.deleted('Channel deleted successfully')
	}
)
