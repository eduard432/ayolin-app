/* eslint-disable @typescript-eslint/no-unused-vars */

'use server'

import { RegisterSchema } from '@/schemas'
import z from 'zod'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return {
			error: 'Invalid fields!',
		}
	}

	const { email, password, name } = validatedFields.data
	const hashedPassword = await bcryptjs.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Email alredy in use!' }
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await
	generateVerificationToken(email)

	

	return { success: 'User created' }
}
