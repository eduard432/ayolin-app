import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user/user.server";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { UserRole } from "@prisma/client";

export const runtime = "nodejs";

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
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if(!validatedFields.success) return null;

          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const { verifyPassword } = await import("@/lib/password");

          const ok = await verifyPassword(password, user.password);
          if(!ok) return null


          return{
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            role: user.role as UserRole,  
            isPro: user.isPro,
          };
        },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
