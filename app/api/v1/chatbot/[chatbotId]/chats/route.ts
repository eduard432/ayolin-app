import { handleApiError } from '@/lib/api/handleError'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = auth(async (request, { params }: { params: Promise<{ chatbotId: string }> }) => {
	try {
        const { chatbotId } = await params

		if (!request.auth)
			return NextResponse.json(
				{ message: 'Not authenticated' },
				{ status: 401 }
			)

        const chats = await db.chat.findMany({
            where: {
                chatbotId,
            }
        })

        return NextResponse.json({
            chats
        })
	} catch (error) {
		handleApiError(error)
	}
})
