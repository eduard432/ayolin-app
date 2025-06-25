import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-neutral-200 min-h-screen'>
      <main>{children}</main>
    </div>
  )
}

export default layout
