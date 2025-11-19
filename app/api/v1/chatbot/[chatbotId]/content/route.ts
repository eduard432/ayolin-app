import { auth } from '@/lib/auth'
import { getChatbotById } from '@/data/chatbot/chatbot.server'
import { handleApiError } from '@/lib/api/handleError'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { validateWithSource } from '@/lib/api/validate'
import { del } from '@vercel/blob';

const updateBodySchema = z.object({
	content: z.object({
		filename: z.string(),
		size: z.number(),
		type: z.string(),
		url: z.string().url(),
	}),
})

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
				data: {
					filesInput: data.content,
				},
			})

			return NextResponse.json({
				chatbot: newChatbot,
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)

const deleteBodySchema = z.object({
	url: z.string().url(),
})

export const DELETE = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			if (!request.auth)
				return NextResponse.json(
					{ message: 'Not authenticated' },
					{ status: 401 }
				)

			const { chatbotId } = await params

			const body = await request.json()
			const data = validateWithSource(deleteBodySchema, body, 'body')

            const chatbot = await getChatbotById(chatbotId, request.auth.user.id)

            await del(data.url)

			const newChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					filesInput: chatbot.filesInput.filter((f) => {
                        return f.url !== data.url
                    })
				},
			})

			return NextResponse.json({
				chatbot: newChatbot,
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)
