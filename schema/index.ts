import { fieldSchema } from '@/lib/utils'
import { z } from "zod"

// Reglas para el formulario de login, incluye código 2FA opcional de 6 dígitos
export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Se requiere un correo electrónico válido',
	}),
	password: z.string().min(1, {
		message: 'La contraseña es obligatoria',
	}),
	code: z
		.string()
		.optional()
		.refine((v) => !v || v == "" || /^\d{6}$/.test(v), {
			message: "El código debe tener 6 dígitos",
		})
})

// Registro con confirmación de contraseña y mensajes localizados
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

// Solicitud de reseteo de contraseña: solo valida email
export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Se requiere un correo electrónico válido',
	}),
})

// Nuevo password con confirmación obligatoria
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

// Ajustes de cuenta: permite actualizar campos opcionales con dependencias entre passwords
export const SettingsSchema = z
	.object({
		name: z.string().optional(),
		isTwoFactorEnabled: z.boolean().optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).optional(),
		newPassword: z.string().min(6).optional(),
	})
	.refine((data) => !(data.password && !data.newPassword), {
		message: "La nueva contraseña es obligatoria",
		path: ["newPassword"],
	})
	.refine((data) => !(data.newPassword && !data.password), {
		message: "La contraseña actual es obligatoria",
		path: ["password"],
	})

// Configuración para herramientas de fetch personalizadas (API remotas)
export const CustomFetchToolSettingsSchema = z.object({
	name: z.string(),
	description: z.string(),
	apiUrl: z.string(),
	httpMethod: z.enum(['get', 'post', 'put', 'delete']),
	inputSchema: fieldSchema.array().optional(),
	isBodyParams: z.boolean(),
})

// Validación de endpoint (URL + método HTTP)
export const UrlValueSchema = z.object({
	url: z.string().url('Debe ser una URL válida'),
	method: z.enum(['get', 'post', 'put', 'delete']),
})

// Validación de archivo subido: tipo File y tamaño máximo 5MB
export const FileSchema = z
  .custom<File>((v) => v instanceof File, { message: "Must be a valid file" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  })

// Creación de herramienta: metadatos, schemas opcionales y endpoint requerido
export const createToolSchema = z.object({
  name: z.string(),
  keyName: z.string(),
  shortDesc: z.string(),
  description: z.string(),
  aiDesc: z.string(),
  settingsSchema: fieldSchema.array().optional(),
  inputSchema: fieldSchema.array().optional(),
  endpoint: UrlValueSchema,
  fnType: z.enum(["external", "native"]),
  imageUrl: z.string(),
})

// Creación de archivo: requiere nombre
export const createFileSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
})
