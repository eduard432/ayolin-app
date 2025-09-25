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

  return (
    <QueryProvider>
      <div className="bg-background min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <NavbarDashboard />
        </div>
        <main className="p-1 md:p-8 pb-16 pt-8 flex-1 flex flex-col mx-auto w-11/12">
          {children}
        </main>
        <FooterDashboard />
      </div>
    </QueryProvider>
  )
}

export default layout
