import { db } from '@/lib/db'
import { createToolSchema } from '@/schemas'
import { z } from 'zod'



export const createTool = async (data: z.infer<typeof createToolSchema>) => {
	const tool = await db.toolFunction.create({
		data,
	})
    return tool
}
