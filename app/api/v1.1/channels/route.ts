import { getChannels } from '@/data/channel/channel.server'
import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'

export const GET = ApiErrorHandler.wrap(async () => {
	const tools = await getChannels()
	return ApiResponse.success({
		tools,
	})
})
