import { db } from '@/lib/db'

export const getPasswordResetTokenByToken = (token: string) =>
	db.passwordResetToken.findUnique({
		where: { token },
	})

export const getPasswordResetTokenByEmail = (email: string) =>
	db.passwordResetToken.findFirst({
		where: { email },
	})
