/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import NavbarDashboard from '@/components/navbarDashboard'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
        <NavbarDashboard/>
        <>{children}</>
    </>
  )
}

export default layout