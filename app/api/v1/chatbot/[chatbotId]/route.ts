import { auth } from '@/lib/auth'
import { getChatbotById } from '@/data/chatbot.server'
import { handleApiError } from '@/lib/api/handleError'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

export const DELETE = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			if (!request.auth)
				return NextResponse.json(
					{ message: 'Not authenticated' },
					{ status: 401 }
				)

			const { chatbotId } = await params

			const chatbot = await db.chatbot.delete({
				where: {
					id: chatbotId,
				},
			})

			if (!chatbot) {
				return NextResponse.json(
					{
						message: 'Chatbot notfound',
					},
					{ status: 404 }
				)
			}

			return NextResponse.json({
				message: 'Chatbot deleted',
			})
		} catch (error) {
			handleApiError(error)
		}
	}
)
