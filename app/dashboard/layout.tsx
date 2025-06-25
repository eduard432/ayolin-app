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
		<div className='bg-neutral-200 min-h-screen'>
			<SessionProvider basePath="/api/v1/auth" >
				<Navbar />
				<NavbarDashboard />
				<main className="">{children}</main>
			</SessionProvider>
		</div>
	)
}

export default layout
