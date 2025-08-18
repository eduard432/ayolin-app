import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ApiValidator } from './ApiValidate'
import { auth } from '@/lib/auth'
import { Session } from 'next-auth'

export class ApiError extends Error {
	statusCode: number
	code: string | null
	constructor(message: string, statusCode = 500, code: string | null = null) {
		super(message)
		this.name = 'ApiError'
		this.statusCode = statusCode
		this.code = code
	}
}

export class AuthenticationError extends ApiError {
	constructor(message = 'Not authenticated') {
		super(message, 401, 'AUTH_REQUIRED')
	}
}

export type ValidationErrorType = {
	source?: Source | undefined
	field: string
	message: string
	code: string
}

export class ValidationError extends ApiError {
	errors: ValidationErrorType[]
	constructor(
		message = 'Validation failed',
		errors: ValidationErrorType[] = []
	) {
		super(message, 400, 'VALIDATION_FAILED')
		this.errors = errors
	}
}

export class ValidateUsage extends ApiError {
	constructor(message = 'Usage limit reached', code: string = 'USAGE_LIIMT') {
		super(message, 400, code)
	}
}

export class NotFoundError extends ApiError {
	constructor(message = 'Resource not found') {
		super(message, 404, 'NOT_FOUND')
	}
}

export type Source = 'body' | 'query'

export class ZodValidationError extends ValidationError {
	zodError: ZodError
	source: Source | null

	constructor(zodError: ZodError, source: Source | null = null) {
		const message = source
			? `Validation failed in ${source}`
			: 'Validation failed'

		// Transformar errores de Zod a formato más friendly
		const errors: ValidationErrorType[] = zodError.issues.map((issue) => ({
			field: issue.path.join('.'),
			message: issue.message,
			code: issue.code,
			...(source && { source }),
		}))

		super(message, errors)
		this.zodError = zodError
		this.source = source
	}
}

export class ApiErrorHandler {
	static handleError(error: unknown) {
		console.log('API error:', error)

		if (error instanceof ZodError) {
			return this.handleZodError(error)
		}

		if (error instanceof ZodValidationError) {
			return NextResponse.json(
				{
					success: false,
					message: error.message,
					code: error.code,
					errors: error.errors,
					...(error.source && { source: error.source }),
				},
				{ status: error.statusCode }
			)
		}

		if (error instanceof ApiError) {
			return NextResponse.json(
				{
					success: false,
					message: error.message,
					code: error.code,
				},
				{ status: error.statusCode }
			)
		}

		return NextResponse.json(
			{
				success: false,
				message: 'Internal server error',
				code: 'INTERNAL_ERROR',
			},
			{ status: 500 }
		)
	}

	static handleZodError(zodError: ZodError, source?: Source) {
		const errors = zodError.issues.map((issue) => ({
			field: issue.path.join('.'),
			message: issue.message,
			code: issue.code,
			...(source && { source }),
		}))

		return NextResponse.json(
			{
				success: false,
				message: source
					? `Validation failed in ${source}`
					: 'Validation failed',
				code: 'VALIDATION_FAILED',
				errors,
				...(source && { source }),
			},
			{ status: 400 }
		)
	}

	static wrap<
		T extends (
			request: NextRequest,
			context?: unknown
		) => Promise<NextResponse>,
	>(handler: T) {
		return async (
			request: NextRequest,
			context?: unknown
		): Promise<NextResponse> => {
			try {
				return await handler(request, context)
			} catch (error) {
				return this.handleError(error)
			}
		}
	}

	static wrapAuth<
		T extends (
			request: NextRequest,
			context: { params: Promise<Record<string, string>> },
			session: Session
		) => Promise<NextResponse> | NextResponse,
	>(handler: T) {
		return auth(async (request, context) => {
			try {
				const session = ApiValidator.requireAuth(request)
				handler(request, context, session)
			} catch (error) {
				return this.handleError(error)
			}
		})
	}
}
