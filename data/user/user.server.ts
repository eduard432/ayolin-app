import { NotFoundError, ValidateUsage } from '@/lib/api/ApiError'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { Chatbot, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import z from 'zod'

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

export const deleteUser = async (userId: string) => {
	const user = await db.user.delete({
		where: { id: userId },
	})

	if (!user) {
		return new NotFoundError('User not found')
	}

	if (user.stripeCustomerId) {
		const subscriptions = await stripe.subscriptions.list({
			customer: user.stripeCustomerId,
			status: 'active',
			limit: 1,
		})

		if (subscriptions.data.length > 0) {
			await stripe.subscriptions.cancel(subscriptions.data[0].id)
		}
	}

	try {
		const user = await db.user.delete({
			where: { id: userId },
		})

		return user
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}

export const update2FASchema = z.object({
	enabled: z.boolean(),
})

export const update2FA = async (enabled: boolean, userId: string) => {
	try {
		const user = await db.user.update({
			where: { id: userId },
			data: { isTwoFactorEnabled: enabled },
		})

		return user
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new NotFoundError('Chatbot not found')
		} else {
			throw error
		}
	}
}
