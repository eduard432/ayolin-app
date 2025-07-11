import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FooterDashboard from '@/components/FooterDashboard'
import { ThemeProvider } from '@/components/theme-provider'
import QueryProvider from '@/components/provider/QueryProvider'

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const session = await auth()
	if (!session) redirect('/login')

	return (
		<QueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<SessionProvider
					refetchWhenOffline={false}
					refetchInterval={60 * 60 * 6}
					session={session}
					basePath="/api/v1/auth"
				>
					<div className="bg-background min-h-screen flex flex-col justify-between">
						<div>
							<Navbar />
							<NavbarDashboard />
						</div>
						<main className="pt-8 px-10 pb-16 flex-1 flex flex-col">{children}</main>
						<FooterDashboard />
					</div>
				</SessionProvider>
			</ThemeProvider>
		</QueryProvider>
	)
}

export default layout
