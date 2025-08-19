// routes.ts
/**
 * Centralized routes configuration
 */
export const ROUTES: {
	publicExact: Set<string>
	publicPatterns: RegExp[]
	auth: Set<string>
	apiAuthPrefix: string
	redirect: {
		login: string
		afterLogin: string
	}
} = {
	publicExact: new Set([
		'/',
		'/auth/new-verification',
		'/condiciones-servicios',
		'/politica-privacidad',
	]),

	publicPatterns: [
		/^\/api\/v1\/chat\/[^/]+$/, // /api/v1/chat/:chatId
	],

	auth: new Set([
		'/auth/login',
		'/auth/register',
		'/auth/error',
		'/auth/reset',
		'/auth/new-password',
	]),

	apiAuthPrefix: '/api/v1/auth',

	redirect: {
		login: '/auth/login',
		afterLogin: '/dashboard/general',
	},
}

/**
 * Authentication callback routes (under apiAuthPrefix)
 */
export const authCallbacks = new Set(['/callback/google', '/callback/github'])
