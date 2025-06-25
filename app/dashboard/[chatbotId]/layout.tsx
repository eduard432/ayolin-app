/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'
import Navbar from '@/components/navbar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-neutral-200 min-h-sc'>
        <Navbar/>
        <NavbarDashboard/>
        <main className='pt-20 px-6'>{children}</main>
    </div>
  )
}

export default layout