import 'server-only'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user/user.server'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor/two-factor-confirmation.server'
import { getAccountByUserId } from '@/data/account/account'

import { UserRole } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'
import type { Account, Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthConfig = {
  trustHost: true,
  basePath: '/api/v1/auth',
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  // Marca email verificado al vincular cuenta OAuth
  events: {
    async linkAccount({ user }: { user: AdapterUser | User }) {
      if ('id' in user) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        })
      }
    },
  },

  callbacks: {
    // Gate para credenciales (email/password) + 2FA
    async signIn({ user, account }: { user: AdapterUser | User; account?: Account | null }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const confirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (!confirmation) return false
        await db.twoFactorConfirmation.delete({ where: { id: confirmation.id } })
      }
      return true
    },

    // Lo que exponemos al cliente
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) session.user.id = token.sub
      if (token.role && session.user) session.user.role = token.role as UserRole

      session.user.isTwoFactorEnabled =
        typeof token.isTwoFactorEnabled === 'boolean' ? token.isTwoFactorEnabled : undefined

      session.user.name = token.name
      session.user.email = token.email ?? ''
      if (token.image && session.user) session.user.image = token.image as string

      session.user.isOAuth = typeof token.isOAuth === 'boolean' ? token.isOAuth : undefined
      session.user.isPro = typeof token.isPro === 'boolean' ? token.isPro : false

      // Avatar estilo Google: solo color de fondo
      session.user.avatarColor = (token.avatarColor as string | null) ?? null

      return session
    },

    // Rehidratación del JWT (clave para que siempre cargue la sesión completa)
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token

      // Hidratar al primer login o cuando falten datos clave
      const needsHydration =
        !!user ||
        !token.email ||
        token.role === undefined ||
        token.isPro === undefined ||
        token.avatarColor === undefined

      if (needsHydration) {
        const u = await db.user.findUnique({
          where: { id: token.sub },
          select: {
            name: true,
            email: true,
            image: true,
            role: true,
            isTwoFactorEnabled: true,
            isPro: true,
            avatarColor: true, // solo este para el avatar
          },
        })

        if (u) {
          token.name = u.name ?? null
          token.email = u.email ?? null
          token.image = u.image ?? null
          token.role = (Object.values(UserRole).includes(u.role as UserRole) ? u.role : UserRole.FREE) as UserRole
          token.isTwoFactorEnabled = !!u.isTwoFactorEnabled
          token.isPro = !!u.isPro
          token.avatarColor = u.avatarColor ?? null
        }

        // Saber si la cuenta es OAuth
        const acc = await getAccountByUserId(token.sub)
        token.isOAuth = !!acc
      }

      // Actualizaciones desde la UI (p.ej., cambiar color del avatar)
      if (trigger === 'update' && session) {
        if (session.avatarColor !== undefined) token.avatarColor = session.avatarColor as string | null
      }

      return token
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
