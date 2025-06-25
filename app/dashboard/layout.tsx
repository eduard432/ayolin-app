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
		<SessionProvider basePath="/api/v1/auth">
			<div className="bg-neutral-200 min-h-screen">
				<Navbar />
				<NavbarDashboard />
				<main>{children}</main>
			</div>
		</SessionProvider>
	)
}

export default layout
