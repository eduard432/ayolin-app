import { getMessagesByChatId } from '@/data/chat.server'
import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const getMessagesParamsSchema = z.object({
	chatId: z.string(),
})

export async function GET(
	req: NextRequest,
	{ params: paramsPromise }: { params: { chatId: string } }
) {
	try {
		const params = await paramsPromise
		const { chatId } = validateWithSource(
			getMessagesParamsSchema,
			params,
			'params'
		)
		const messages = await getMessagesByChatId(chatId)

		return NextResponse.json({
			messages
		})
	} catch (error) {
		return handleApiError(error)
	}
}
