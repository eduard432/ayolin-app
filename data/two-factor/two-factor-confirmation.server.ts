import { db } from '@/lib/db'

export const getTwoFactorConfirmationByUserId = (userId: string) =>
	db.twoFactorConfirmation.findUnique({
		where: { userId },
	})
