import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FooterDashboard from '@/components/FooterDashboard'
import DashboardProvider from '@/components/provider/DashboardProvider'

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const session = await auth()
	if (!session) redirect('/login')

	return (
		<DashboardProvider session={session}>
			<div className="bg-background min-h-screen flex flex-col justify-between">
				<div>
					<Navbar />
					<NavbarDashboard />
				</div>
				<main className="pt-8 px-10 pb-16 flex-1 flex flex-col">
					{children}
				</main>
				<FooterDashboard />
			</div>
		</DashboardProvider>
	)
}

export default layout
