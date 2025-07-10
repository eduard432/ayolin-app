import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const toolFunctions = await db.toolFunction.findMany()
		return NextResponse.json({
			toolFunctions,
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{
                message: "Unexpected error"
            },
			{
				status: 500,
			}
		)
	}
}