/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/api/stripe/webhook",
    "/condiciones-servicios",
	"/politica-privacidad",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
    "/api/v1/auth/callback/google",
    "/api/v1/auth/callback/github",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this preffix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/v1/auth"


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard/general"