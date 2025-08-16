'use server'

import { RegisterSchema } from '@/schemas'
import z from 'zod'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user/user.server'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return {
			error: 'Campos Invalidos!',
		}
	}

	const { email, password, name } = validatedFields.data
	const hashedPassword = await bcryptjs.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Este email ya esta en uso' }
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await
	generateVerificationToken(email);
	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token,
	)

	return { success: 'Te enviamos un correo' }
}
