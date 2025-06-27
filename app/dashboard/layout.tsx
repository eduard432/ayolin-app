import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import FooterDashboard from '@/components/FooterDashboard'
import { ThemeProvider } from '@/components/theme-provider'

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const session = await auth()
	if (!session) redirect('/login')

	return (
		<SessionProvider
			refetchWhenOffline={false}
			refetchInterval={60 * 60 * 6}
			session={session}
			basePath="/api/v1/auth"
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<div className="bg-neutral-100 min-h-screen">
					<Navbar />
					<NavbarDashboard />
					<main className="pt-8 px-10 pb-12">{children}</main>
					<FooterDashboard />
				</div>
			</ThemeProvider>
		</SessionProvider>
	)
}

export default layout
