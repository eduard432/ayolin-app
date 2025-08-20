import { getTools } from '@/data/tools/tools.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'

export const GET = ApiErrorHandler.wrap(async () => {
	const tools = await getTools()
	return ApiResponse.success({
		tools,
	})
})
