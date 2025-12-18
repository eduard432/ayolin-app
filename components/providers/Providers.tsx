'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

export default function Providers({ 
    children, 
    session, 
}: { 
    children: React.ReactNode 
    session?: Session | null
}) {
  return (
    <SessionProvider
      basePath="/api/v1/auth"
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      refetchInterval={0}
    >
      {children}
    </SessionProvider>
  )
}
