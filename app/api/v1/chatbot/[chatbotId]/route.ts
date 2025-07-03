import { auth } from '@/auth'
import { getChatbotById } from '@/data/chatbot.server'
import { handleApiError } from '@/lib/api/handleError'
import { NextResponse } from 'next/server'

export const GET = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			if (!request.auth)
				return NextResponse.json(
					{ message: 'Not authenticated' },
					{ status: 401 }
				)

			const chatbot = await getChatbotById(chatbotId)

			if (!chatbot) {
				return NextResponse.json(
					{ message: 'Chatbot not found' },
					{ status: 404 }
				)
			} else {
				return NextResponse.json({
					chatbot,
				})
			}
		} catch (error) {
			return handleApiError(error)
		}
	}
)
