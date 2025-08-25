'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

const DashboardProvider = ({
	children,
	session,
}: Readonly<{ children: React.ReactNode; session: Session }>) => {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider
				refetchWhenOffline={false}
				refetchInterval={60 * 60 * 6}
				session={session}
				basePath="/api/v1/auth"
				refetchOnWindowFocus={false}
			>
				{children}
			</SessionProvider>
		</QueryClientProvider>
	)
}

export default DashboardProvider
