import { db } from '@/lib/db'

export const getUserByEmail = (email: string) =>
	db.user.findUnique({ where: { email } })

export const getUserById = (id: string) => db.user.findUnique({where: {id}})