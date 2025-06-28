import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import FooterDashboard from '@/components/FooterDashboard'

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
			<div className="bg-neutral-100 min-h-screen flex flex-col justify-between">
				<div>
					<Navbar />
					<NavbarDashboard />
				</div>
				<main className="pt-8 px-10 pb-16 flex-1">{children}</main>
				<FooterDashboard />
			</div>
		</SessionProvider>
	)
}

export default layout
