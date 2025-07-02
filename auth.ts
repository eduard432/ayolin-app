import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      isTwoFactorEnabled?: boolean;
      isOAuth?: boolean;
      name?: string | null;
      email?: string | null;
      isPro?: boolean;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    isTwoFactorEnabled?: boolean;
    isPro?: boolean;
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    role: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
    name?: string | null;
    email?: string | null;
    isPro?: boolean;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = typeof token.isTwoFactorEnabled === "boolean" ? token.isTwoFactorEnabled : undefined;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = typeof token.isOAuth === "boolean" ? token.isOAuth : undefined;
        session.user.isPro = typeof token.isPro === "boolean" ? token.isPro : false;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isPro = existingUser.isPro;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
