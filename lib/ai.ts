import { Prisma } from '@prisma/client'
import { Tool } from 'ai'
import { AI_TOOL_INDEX } from '@/ai_tools'
import { CustomFetchToolSettingsSchema } from '@/schemas'
import { z } from 'zod'

export const generateCustomFetchTool = (
	settings: z.infer<typeof CustomFetchToolSettingsSchema>
): Tool => {
	return {
		name: `custom_fetch:${settings.name}`,
		description: settings.description,
		inputSchema:
			settings.inputSchema &&
			z.object(
				Object.fromEntries(
					settings.inputSchema.map((field) => {
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
						base.describe(field.description)
						if (!field.required) base = base.optional()

						return [field.name, base]
					})
				)
			),
		execute: async (input: { [key: string]: unknown }) => {
			try {
				let url = settings.apiUrl

				if (input) {
					for (const key in input) {
						const value = String(input[key])
						url = url.replaceAll(`{{${key}}}`, value)
					}
				}

				const response = await fetch(url, {
					method: settings.httpMethod.toUpperCase(),
					headers: {
						'Content-Type': 'application/json',
					},
					body: settings.isBodyParams ? JSON.stringify(input) : undefined,
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = await response.json()
				return data
			} catch {
				return 'Error executing custom fetch tool: '
			}
		},
	}
}

export const generateTools = (
	chatbotTools: {
		keyName: string
		settings: Prisma.JsonValue
	}[]
): { [k: string]: Tool } => {
	const tools: Record<string, Tool> = {}

	for (const tool of chatbotTools) {
		const key = tool.keyName

		if (AI_TOOL_INDEX[key]) {
			tools[key] = AI_TOOL_INDEX[key]
		} else if (key.includes('custom_fetch:')) {
			const settings = tool.settings as z.infer<
				typeof CustomFetchToolSettingsSchema
			>

			generateCustomFetchTool(settings)
		} else {
			console.warn(`Tool with keyName "${key}" not found.`)
		}
	}

	return tools
}
