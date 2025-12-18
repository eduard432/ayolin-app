// Cambie todo el codigo de aqui, ahora funciona diferente providers Credential (pide mas cosas) 

import "server-only"

import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { UserRole } from "@prisma/client"

import { LoginSchema } from "@/schema" 
import { getUserByEmail } from "@/data/user/user.server"

export default {
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "Code", type: "text" },
      },

      async authorize(credentials, _req) {
        if (!credentials) return null

        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          role: user.role as UserRole,
          isPro: user.isPro,
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthOptions