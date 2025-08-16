import { auth } from '@/lib/auth'
import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutes,
} from '@/routes'
import { NextResponse } from 'next/server'

export default auth((req) => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isTelegramWebhook = nextUrl.pathname.startsWith(
		'/api/v1/webhook/telegram'
	)

	if (isTelegramWebhook) {
		return NextResponse.next()
	}

	const isStripeWebhook = nextUrl.pathname.startsWith('/api/v1/stripe/webhook')
	if (isStripeWebhook) return NextResponse.next()

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoute) return NextResponse.next()

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return NextResponse.next()
	}

	if (!isLoggedIn && !isPublicRoute) {
		return NextResponse.redirect(new URL('/auth/login', nextUrl))
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff2?)$|api/v1/stripe/webhook|api/stripe/webhook|api/v1/webhook/telegram).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
