import { Message } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from 'ai'
import { formatISO } from 'date-fns'
import { z, ZodObject, ZodTypeAny } from 'zod'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function convertToUIMessages(messages: Message[]): UIMessage[] {
	return messages.map((message) => ({
		id: message.id,
		role: message.role as 'user' | 'assistant' | 'system',
		parts: message.parts as UIMessagePart<UIDataTypes, UITools>[],
		metadata: {
			createdAt: formatISO(message.createdAt),
		},
	}))
}

export const fieldSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(3),
	type: z.enum(['string', 'number', 'boolean']),
	required: z.boolean(),
})

export function fieldsToZod(fields: z.infer<typeof fieldSchema>[]): ZodObject<Record<string, ZodTypeAny>> {
	const schemaFields: Record<string, z.ZodTypeAny> = {}

	for (const field of fields) {
		let base: z.ZodTypeAny

		switch (field.type) {
			case 'string':
				base = z.string()
				break
			case 'boolean':
				base = z.boolean()
				break

			case 'number':
				base = z.number()
				break
			default:
				base = z.any()
				break
		}

		if (!field.required) base = base.optional()

		schemaFields[field.name] = base
	}

	const dynamicSchema = z.object(schemaFields)

	return dynamicSchema
}
