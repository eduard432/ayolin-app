// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "@/data/account"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"
import type { AdapterUser } from "next-auth/adapters"
import type { Account, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { NextAuthConfig } from "next-auth"

export const authOptions: NextAuthConfig = {
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

      return session
    },
    async jwt({ token }: { token: JWT }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.image = existingUser.image
      if (Object.values(UserRole).includes(existingUser.role as UserRole)){
        token.role = existingUser.role as UserRole
      } else {
        token.role = UserRole.FREE
      }

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.isPro = existingUser.isPro

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
}


