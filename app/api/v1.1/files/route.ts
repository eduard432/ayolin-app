import { ApiErrorHandler } from '@/lib/api/ApiError'
import { ApiResponse } from '@/lib/api/ApiResponse'
import { ApiValidator } from '@/lib/api/ApiValidate'
import { createFileSchema } from '@/schemas'
import { put } from '@vercel/blob'

export const POST = ApiErrorHandler.wrapAuth(async (request) => {
	const data = ApiValidator.validateQuery(request, createFileSchema)
	const formData = await request.formData()
	const file = formData.get('file')

	const blob = await put(
		data.filename,
		file as Blob,
		{
			access: 'public',
			addRandomSuffix: true,
		}
	)

	return ApiResponse.created({ message: 'File uploaded successfully', blob })
})