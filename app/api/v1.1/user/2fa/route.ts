import { update2FA, update2FASchema } from '@/data/user/user.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'

export const PUT = ApiErrorHandler.wrapAuth(async (request, _, session) => {
	const data = await ApiValidator.validateBody(request, update2FASchema)
	const user = await update2FA(data.enabled, session.user.id)
	return ApiResponse.updated(user, 'User updated')
})
