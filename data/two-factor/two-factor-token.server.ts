import { db } from '@/lib/db'

export const getTwoFactorTokenByToken = (token: string) =>
	db.twoFactorToken.findUnique({
		where: { token },
	})

export const getTwoFactorTokenByEmail = (email: string) =>
	db.twoFactorToken.findFirst({
		where: { email },
	})
