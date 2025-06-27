import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcryptjs from 'bcryptjs'
import { getUserById } from './data/user'
import { UserRole } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github' 
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

declare module 'next-auth' {
	interface Session {
		user: {
			role: UserRole
			isTwoFactorEnabled?: boolean
			isOAuth?: boolean
		} & DefaultSession['user']
	}
}
export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	basePath: '/api/v1/auth',
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			async authorize(credentials) {
				const validateFields = LoginSchema.safeParse(credentials)

				if (validateFields.success) {
					const { email, password } = validateFields.data

					const user = await getUserByEmail(email)
					if (!user || !user.password) return null

					const passwordMatch = await bcryptjs.compare(password, user.password)

					if (passwordMatch) return user
				}

				return null
			},
		}),
		GoogleProvider({
			clientId:  process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		  GitHubProvider({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
	],
	events: {
		async linkAccount({user}){
			await db.user.update({
				where: {id: user.id},
				data: {emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account}){
			if (account?.provider !== "credentials") return true;

			if (!user.id) return false;
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;
			if(existingUser.isTwoFactorEnabled){
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
				
				if(!twoFactorConfirmation) return false;
				await db.twoFactorConfirmation.delete({where: {id: twoFactorConfirmation.id},});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if(session.user){
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
				session.user.name = token.name;
				session.user.email = token.email ?? "";
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)
			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},

});
