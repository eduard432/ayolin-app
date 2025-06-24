// components/Navbar.tsx
'use client'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {

  return (
    <nav id="navbar" className="fixed rounded-b-md top-0 left-0 w-full bg-neutral-900 shadow z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-sky-700">
          AYOLIN
        </Link>
      </div>
    </nav>
  )
}
