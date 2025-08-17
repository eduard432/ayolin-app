import { NextAuthRequest } from 'next-auth'
import z, { ZodTypeAny } from 'zod'
import { AuthenticationError, Source, ZodValidationError } from './ApiError'
import { NextRequest } from 'next/server'

export class ApiValidator {
	static requireAuth(request: NextAuthRequest) {
		if (!request.auth) {
			throw new AuthenticationError()
		}
		return request.auth
	}

	static validateWithSource<T extends ZodTypeAny>(
		schema: T,
		data: unknown,
		source: Source
	): z.infer<T> {
		const result = schema.safeParse(data)
		if (!result.success) {
			throw new ZodValidationError(result.error, source)
		}

		return result.data
	}

	static async validateBody<T extends ZodTypeAny>(
		request: NextRequest,
		schema: T
	): Promise<z.infer<T>> {
		return request
			.json()
			.then((body) => this.validateWithSource(schema, body, 'body'))
	}

	static validateQuery<T extends ZodTypeAny>(
		request: NextRequest,
		schema: T
	): z.infer<T> {
		const { searchParams } = new URL(request.url)
		const query = Object.fromEntries(searchParams.entries())
		return this.validateWithSource(schema, query, 'query')
	}
}
