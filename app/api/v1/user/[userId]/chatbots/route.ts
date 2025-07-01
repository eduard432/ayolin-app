import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import { validateWithSource } from '@/lib/api/validate'
import { handleApiError } from '@/lib/api/handleError'
import { getChatBotByUserId } from '@/data/chatbot.server'

// GET: Get all chatbots from user:
// /api/v2/users/:userId/chatbots
const paramsSchema = z.object({
	userId: z.string(),
})

export async function GET(
	request: NextRequest,
	{ params: paramsPromise }: { params: Promise<z.infer<typeof paramsSchema>> }
) {
	try {
		const params = await paramsPromise
		const { userId } = validateWithSource(paramsSchema, params, 'params')
		const result = await getChatBotByUserId(userId)

		return NextResponse.json({
			chatbots: result,
		})
	} catch (error) {
		return handleApiError(error)
	}
}