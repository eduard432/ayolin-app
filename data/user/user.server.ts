import { NotFoundError, ValidateUsage } from '@/lib/api/ApiError'
import { db } from '@/lib/db'
import { Chatbot, User } from '@prisma/client'

export const getUserByEmail = (email: string) =>
	db.user.findUnique({ where: { email } })

export const getUserById = (id: string) =>
	db.user.findUnique({ where: { id } })

export const validateMaxChatbot = async (
	id: string,
	prevUser?: User & { chatbots: Chatbot[] }
) => {
	let user: (User & { chatbots: Chatbot[] }) | null | undefined = prevUser
	if (!user) {
		user = await db.user.findFirst({
			where: {
				id,
			},
			include: {
				chatbots: true,
			},
		})

		if (!user) return new NotFoundError('User not found')
	}

	if (user.chatbots.length >= user.maxChatbots) {
		return new ValidateUsage('Max chabots quota reached')
	}

	return user
}
