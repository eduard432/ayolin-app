import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const session = await auth()
	if (!session) redirect('/login')

	return (
		<SessionProvider
			refetchInterval={60 * 60 * 6}
			session={session}
			basePath="/api/v1/auth"
		>
			<div className="bg-neutral-200 min-h-screen">
				<Navbar />
				<NavbarDashboard />
				<main className="pt-8 px-10" >{children}</main>
			</div>
		</SessionProvider>
	)
}

export default layout
