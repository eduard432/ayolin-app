import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user/user.server"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor/two-factor-confirmation.server"
import { getAccountByUserId } from "@/data/account/account"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"
import type { AdapterUser } from "next-auth/adapters"
import type { Account, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"

export const authOptions: NextAuthConfig = {
  trustHost: true,
  basePath: "/api/v1/auth",
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }: { user: AdapterUser | User }) {
        if("id" in user){
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        })
      }
    }
  },
  callbacks: {
    async signIn({ user, account }: { user: AdapterUser | User; account?: Account | null }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const confirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (!confirmation) return false

        await db.twoFactorConfirmation.delete({ where: { id: confirmation.id } })
      }

      return true
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      session.user.isTwoFactorEnabled =
        typeof token.isTwoFactorEnabled === "boolean" ? token.isTwoFactorEnabled : undefined

      session.user.name = token.name
      session.user.email = token.email ?? ""

      if(token.image && session.user){
        session.user.image = token.image as string
      }

      session.user.isOAuth =
        typeof token.isOAuth === "boolean" ? token.isOAuth : undefined

      session.user.isPro =
        typeof token.isPro === "boolean" ? token.isPro : false

      session.user.avatarColor = (token.avatarColor as string | null) ?? null
      session.user.avatarSeed = (token.avatarSeed as string | null) ?? null
      session.user.avatarNoBg = typeof token.avatarNoBg === "boolean" ? token.avatarNoBg : true

      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token

      if(user){
      
        const existingUser = await getUserById(token.sub)
        if(!existingUser){
          return token
        }

        token.name = existingUser.name
        token.email = existingUser.email
        token.image = existingUser.image

        const existingAccount = await getAccountByUserId(existingUser.id)
        token.isOAuth = !!existingAccount

        if (Object.values(UserRole).includes(existingUser.role as UserRole)){
          token.role = existingUser.role as UserRole
        } else {
          token.role = UserRole.FREE
        }

        token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
        token.isPro = existingUser.isPro
        token.avatarColor = existingUser.avatarColor ?? null
        token.avatarSeed = existingUser.avatarSeed ?? null
        token.avatarNoBg = existingUser.avatarNoBg ?? null
      }

      if(trigger === "update" && session?.avatarColor !== undefined){
        token.avatarColor = session.avatarColor
      }
      if(trigger === "update"){
        if (session?.avatarColor !== undefined) token.avatarColor = session.avatarColor
        if (session?.avatarSeed !== undefined) token.avatarSeed = session.avatarSeed as string | null
        if (session?.avatarNoBg !== undefined) token.avatarNoBg = session.avatarNoBg as boolean
      }

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)

