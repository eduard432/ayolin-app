/**
 * Este archivo es EXCLUSIVAMENTE de servidor.
 * Contiene valores derivados de process.env
 * que no deben importarse en componentes client.
 */
import "server-only"

/**
 * DOMAIN_URL
 * ----------
 * URL base de la app válida para:
 * - desarrollo local
 * - producción en Vercel
 * - dominio custom
 *
 * Prioridad:
 * 1) AUTH_URL (si existe)
 * 2) https://VERCEL_URL (Vercel)
 * 3) http://localhost:3000 (fallback local)
 */
export const DOMAIN_URL =
  process.env.AUTH_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000")