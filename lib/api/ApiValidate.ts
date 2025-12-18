// cambie codigo, ( es diferente al que teniamos)

import { NextRequest } from 'next/server'
import { z,  type ZodTypeAny } from 'zod'
import { AuthenticationError, type Source, ZodValidationError } from './ApiError'
import type { Session } from 'next-auth'

type AuthRequest = NextRequest & { auth?: Session | null }

export class ApiValidator {
	static requireAuth(request: AuthRequest) {
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
