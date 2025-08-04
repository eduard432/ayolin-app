import { fieldSchema } from '@/lib/utils'
import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Se requiere un correo electrónico válido',
	}),
	password: z.string().min(1, {
		message: 'La contraseña es obligatoria',
	}),
	code: z.optional(z.string()),
})

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: 'Se requiere un correo electrónico válido',
		}),
		password: z.string().min(6, {
			message: 'Se requieren al menos 6 caracteres',
		}),
		name: z.string().min(1, {
			message: 'El nombre es obligatorio',
		}),
		password2: z.string().min(1, {
			message: 'Deben coincidir las contraseñas',
		}),
	})
	.refine((data) => data.password === data.password2, {
		path: ['password2'], // Apunta el error al campo password2
		message: 'Las contraseñas no coinciden',
	})

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Se requiere un correo electrónico válido',
	}),
})

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6, {
			message: '¡Se requieren al menos 6 caracteres!',
		}),
		confirmPassword: z.string().min(6, {
			message: 'Deben coincidir las contraseñas',
		}),
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	})

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false
			}

			return true
		},
		{
			message: 'La nueva contraseña es obligatoria',
			path: ['newPassword'],
		}
	)
	.refine(
		(data) => {
			if (data.newPassword && !data.password) {
				return false
			}

			return true
		},
		{
			message: 'La contraseña actual es obligatoria',
			path: ['password'],
		}
	)

export const CustomFetchToolSettingsSchema = z.object({
	name: z.string(),
	description: z.string(),
	apiUrl: z.string(),
	httpMethod: z.enum(['get', 'post', 'put', 'delete']),
	inputSchema: fieldSchema.array().optional(),
	isBodyParams: z.boolean(),
})
