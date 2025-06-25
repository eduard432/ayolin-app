import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<SessionProvider basePath="/api/v1/auth" >
			<Navbar />
			<NavbarDashboard />
			<main className="bg-neutral-100 px-16 py-8">{children}</main>
		</SessionProvider>
	)
}

export default layout
