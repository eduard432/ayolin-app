import React from 'react'
import NavbarDashboard from '@/components/layout/NavbarDashboard'
import Navbar from '@/components/layout/Navbar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FooterDashboard from '@/components/layout/FooterDashboard'
import { Metadata } from 'next'
import QueryProvider from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard App',
}

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth()
	if (!session) redirect('/auth/login')

	return <QueryProvider>{children}</QueryProvider>
}

export default layout
