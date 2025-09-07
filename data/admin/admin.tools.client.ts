import { createToolSchema } from "@/schemas";
import { ToolFunction } from "@prisma/client";
import { z } from 'zod'

export const createTool = async (data: z.infer<typeof createToolSchema>) => {
    const response = await fetch(`/api/v1.1/tools`, {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(data)
    })

    if(!response.ok) throw new Error('Failed to create tool')

    const result = await response.json()
    return result.tool as ToolFunction
}