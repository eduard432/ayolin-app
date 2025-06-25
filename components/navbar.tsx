// components/Navbar.tsx
'use client'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {

  return (
    <nav id="navbar" className="fixed top-0 left-0 w-full h-16 bg-neutral-900 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center h-full">
            <Link href="/" className="text-3xl font-bold text-sky-700">AYOLIN</Link>
            {/*Esto lo quitamos despues */}
            <form>
              <button 
                className=" text-white px-2 py-1 pt-7 font-black" 
                type="submit"
              >
                Sign Out
              </button>
            </form>
        </div>
    </nav>
  )
}
