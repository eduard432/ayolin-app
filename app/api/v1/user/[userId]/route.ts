import { handleApiError } from '@/lib/api/handleError'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = auth(async (request) => {
	try {
		if (!request.auth)
			return NextResponse.json(
				{ message: 'Not authenticated' },
				{ status: 401 }
			)

		const user = await db.user.findFirst({
			where: {
				id: request.auth.user.id,
			},
		})

		if (!user) {
			return NextResponse.json(
				{
					message: 'Not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({
			user,
		})
	} catch (error) {
		return handleApiError(error)
	}
})
