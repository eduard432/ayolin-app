import { auth } from '@/lib/auth'
import { ROUTES, authCallbacks } from '@/routes'
import { NextResponse } from 'next/server'
import path from 'path'

export default auth((req) => {
	const { nextUrl } = req
	const pathname = nextUrl.pathname
	const isLoggedIn = !!req.auth

	if(pathname.includes("webhook")){
		return NextResponse.next()
	}

	// --- NUNCA interceprar rutas de Auth.js ---
	if(pathname.startsWith('/api/v1/auth')){
		return NextResponse.next()
	}

	// --- API Auth routes ---
	if (pathname.startsWith(ROUTES.apiAuthPrefix)) {
		// Si es un callback de OAuth
		for (const cb of authCallbacks) {
			if (pathname.startsWith(`${ROUTES.apiAuthPrefix}${cb}`)) {
				if (isLoggedIn) {
					return NextResponse.redirect(
						new URL(ROUTES.redirect.afterLogin, nextUrl)
					)
				}
			}
		}
		return NextResponse.next()
	}

	// --- Auth routes (login/register/etc) ---
	if ([...ROUTES.auth].some((route) => pathname.startsWith(route))) {
		if (isLoggedIn) {
			return NextResponse.redirect(
				new URL(ROUTES.redirect.afterLogin, nextUrl)
			)
		}
		return NextResponse.next()
	}

	// --- Public routes ---
	const isPublicRoute =
		ROUTES.publicExact.has(pathname) ||
		ROUTES.publicPatterns.some((pattern) => pattern.test(pathname))

	if (isPublicRoute) {
		return NextResponse.next()
	}

	// --- Private routes ---
	if (!isLoggedIn) {
		return NextResponse.redirect(new URL(ROUTES.redirect.login, nextUrl))
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		// Todas las rutas, excepto:
		// - Internals de Next.js (_next)
		// - Archivos estáticos (.ico, .png, .jpg, .jpeg, .svg, .css, .js, .woff, .woff2)
		// - Webhooks (api/v1/webhook)
		'/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff2?)$|api/v1/webhook).*)',

		// Todas las API routes (excepto webhooks, ya excluidas arriba)
		'/api/:path*',

		// Todas las TRPC routes
		'/trpc/:path*',
	],
}
