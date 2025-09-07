import { createTool } from '@/data/admin/admin.tools.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'
import { createToolSchema } from '@/schemas'

export const POST = ApiErrorHandler.wrapAuth(async (request) => {
	const data = await ApiValidator.validateBody(request, createToolSchema)
	const tool = await createTool(data)
	return ApiResponse.created({ tool })
})
