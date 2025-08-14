'use server'

import { signIn } from '@/lib/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user/user.server'
import { getTwoFactorTokenByEmail } from '@/data/two-factor/two-factor-token.server'
import { db } from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor/two-factor-confirmation.server'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return {
			error: 'Campos inválidos',
		}
	}

	const { email, password, code } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if(!existingUser || !existingUser.email || !existingUser.password){
		return { error: "El correo no existe"}
	}

	if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success: "Correo de confirmación enviado"}
    }

	if(existingUser.isTwoFactorEnabled && existingUser.email){
		if(code){
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			);

			if(!twoFactorToken){
				return{error: "Código inválido"}
			} 

			if(twoFactorToken.token !== code){
				return { error: "Código inválido"}
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if(hasExpired){
				return { error: "El código ha caducado"}
			}

			await db.twoFactorToken.delete({
				where: {id: twoFactorToken.id}
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
			if(existingConfirmation){
				await db.twoFactorConfirmation.delete({
					where: {id: existingConfirmation.id}
				})
			}

			await db.twoFactorConfirmation.create({
				data:{
					userId: existingUser.id,
				}
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			await sendTwoFactorTokenEmail(
				twoFactorToken.email,
				twoFactorToken.token,
			);

			return { twoFactor: true}
		}
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
						error: '¡Credenciales inválidas!',
					}

				default:
					return {
						error: '¡Ups! Algo salió mal',
					}
			}
		}

		throw error
	}
}
