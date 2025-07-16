import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const channels = await db.channel.findMany()
        return NextResponse.json({
            channels
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