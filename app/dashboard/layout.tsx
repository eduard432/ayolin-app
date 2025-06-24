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
    <>
      <Navbar/>
      <NavbarDashboard/>
      <main className='pt-32'>{children}</main>
    </>
  )
}

export default layout