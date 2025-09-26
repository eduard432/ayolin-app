import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
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
