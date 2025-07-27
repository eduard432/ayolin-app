import { auth } from '@/lib/auth'
import { getChatbotById } from '@/data/chatbot.server'
import { handleApiError } from '@/lib/api/handleError'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { validateWithSource } from '@/lib/api/validate'

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

			const chatbot = await db.chatbot.findFirst({
				where: {
					id: chatbotId,
					userId: request.auth.user.id,
				},
			})

			if (!chatbot) {
				return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
			}

			await db.chatbot.delete({
				where: {
					id: chatbotId,
				},
			})

			return NextResponse.json({
				message: 'Chatbot deleted',
			})
		} catch (error) {
			handleApiError(error)
		}
	}
)

const updateBodySchema = z
	.object({
		name: z.string(),
		model: z.string(),
		initialPrompt: z.string(),
	})
	.strict()

export const PUT = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			if (!request.auth)
				return NextResponse.json(
					{ message: 'Not authenticated' },
					{ status: 401 }
				)

			const { chatbotId } = await params

			const body = await request.json()
			const data = validateWithSource(updateBodySchema, body, 'body')

			const newChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data,
			})

			return NextResponse.json({
				chatbot: newChatbot
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)
