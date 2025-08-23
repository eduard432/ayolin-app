export const runtime = "nodejs";

import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
	keyName: z.string(),
	settings: z.record(z.string(), z.any()).optional(),
})

export const POST = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			const body = await request.json()
			const { keyName, settings } = validateWithSource(bodySchema, body, 'body')

			const updatedChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					tools: {
						push: {
							keyName,
							settings: settings || {},
						},
					},
				},
			})

			return NextResponse.json({
				message: 'Tool installed',
				ok: true,
                chatbot: updatedChatbot
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)

export const DELETE = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			const body = await request.json()
			const { keyName } = validateWithSource(bodySchema, body, 'body')

			const chatbot = await db.chatbot.findFirst({
				where: {
					id: chatbotId,
				},
			})

			if (!chatbot)
				return NextResponse.json(
					{
						message: 'Chatbot not found',
						ok: false,
					},
					{ status: 404 }
				)

			const newTools = chatbot.tools.filter(
				(tool) => tool.keyName !== keyName
			) as { keyName: string; settings: InputJsonValue }[]

			const updatedChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					tools: {
						set: newTools,
					},
				},
			})

			return NextResponse.json({
				message: 'Tool removed',
				ok: true,
                chatbot: updatedChatbot
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)
