import { handleApiError } from '@/lib/api/handleError'
import { validateWithSource } from '@/lib/api/validate'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'
import { z } from 'zod'


const bodySchema = {
	keyName: z.string(),
}

const bodySchemaCreate = z.object({
	...bodySchema,
	settings: z.record(z.string(), z.any()).optional(),
	fnType: z.enum(['external', 'native']),
})

export const POST = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			const body = await request.json()
			const { keyName, settings, fnType } = validateWithSource(
				bodySchemaCreate,
				body,
				'body'
			)

			const updatedChatbot = await db.chatbot.update({
				where: {
					id: chatbotId,
				},
				data: {
					tools: {
						push: {
							keyName,
							settings: settings || {},
							fnType,
						},
					},
				},
			})

			return NextResponse.json({
				message: 'Tool installed',
				ok: true,
				chatbot: updatedChatbot,
			})
		} catch (error) {
			return handleApiError(error)
		}
	}
)

const deleteBodySchema = z.object({
	...bodySchema
})

export const DELETE = auth(
	async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
		try {
			const { chatbotId } = await params

			const body = await request.json()
			const { keyName } = validateWithSource(deleteBodySchema, body, 'body')

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
			) as {
				keyName: string
				settings: InputJsonValue
				fnType: 'external' | 'native'
			}[]

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
				chatbot: updatedChatbot,
			})
		} catch (error) {
			console.log(error)
			return handleApiError(error)
		}
	}
)
