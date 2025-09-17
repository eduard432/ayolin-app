import { Prisma, ToolFunction } from '@prisma/client'
import { Tool } from 'ai'
import { AI_TOOL_INDEX } from '@/ai_tools'
import { CustomFetchToolSettingsSchema } from '@/schemas'
import { z } from 'zod'
import { fieldsToZod } from './utils'

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

export const generateExternalToolFunction = ({
	config,
	integration,
}: {
	config: Record<string, string | number | boolean>
	integration: ToolFunction
}): Tool => {

	const execute = async (input: Record<string, unknown>) => {
		try {
			const {endpoint} = integration
			if(!endpoint) throw new Error('No endpoint provided')
			const response = await fetch(endpoint.url, {
				method: endpoint.method,
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					config,
					input
				})
			})

			if(!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			return data
		} catch (error) {
			console.log(error)
			return 'Error fetching server'
		}
	}

	return {
		name: integration.name,
		description: integration.description,
		inputSchema: fieldsToZod(integration.inputSchema),
		execute
	}
}

export const generateTools = (
	chatbotTools: {
		keyName: string
		settings: Prisma.JsonValue
		fnType: 'external' | 'native'
	}[]
): { [k: string]: Tool } => {
	const tools: Record<string, Tool> = {}

	for (const tool of chatbotTools) {
		const key = tool.keyName

		if (tool.fnType === 'native' && AI_TOOL_INDEX[key]) {
			tools[key] = AI_TOOL_INDEX[key]
		} else if (tool.fnType === 'external' && key.includes('custom_fetch:')) {
			throw new Error('CUSTOM_FETCH_TOOL NOT IMPLEMENTED!!!')
			// const settings = tool.settings as z.infer<
			// 	typeof CustomFetchToolSettingsSchema
			// >

			// generateCustomFetchTool(settings)
		} else if (tool.fnType === 'external') {
			const settings = tool.settings as {
				config: Record<string, string | number | boolean>
				integration: ToolFunction
			}

			const generatedTool = generateExternalToolFunction({
				...settings,
			})
			tools[key] = generatedTool
		} else {
			console.warn(`Tool with keyName "${key}" not found.`)
		}
	}

	return tools
}
