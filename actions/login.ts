/* eslint-disable @typescript-eslint/no-unused-vars */

'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return {
			error: 'Invalid fields!',
		}
	}

	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if(!existingUser || !existingUser.email || !existingUser.password){
		return { error: "El email no existe"}
	}

	if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success: "Email de confimacion enviado"}
    }

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})

		return {}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						error: 'Invalid credentials!',
					}

				default:
					return {
						error: 'Something went wrong!',
					}
			}
		}

		throw error
	}
}
