'use server'

import { RegisterSchema } from '@/schemas'
import z from 'zod'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user/user.server'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const runtime = "nodejs";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const parse = RegisterSchema.safeParse(values)

	if (!parse.success) return { error: 'Campos Invalidos!'}

	const { email, password, name } = parse.data

	const existingUser = await getUserByEmail(email)
	if (existingUser) return { error: 'Este email ya esta en uso' }

	const { hashPassword } = await import('@/lib/password')
	const hashedPassword = await hashPassword(password)

	// Creamos el usuario
	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await generateVerificationToken(email)
	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Te enviamos un correo' }
}
