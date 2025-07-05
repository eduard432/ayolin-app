import { Message } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from 'ai'
import { formatISO } from 'date-fns'

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
