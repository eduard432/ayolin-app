import { deleteUser, getUserById } from '@/data/user/user.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'

export const GET = ApiErrorHandler.wrapAuth(async (_, context, session) => {
	const user = await getUserById(session.user.id)
	return ApiResponse.success(user)
})

export const DELETE = ApiErrorHandler.wrapAuth(async (_, context, session) => {
	await deleteUser(session.user.id)
	return ApiResponse.deleted('User deleted')
})
