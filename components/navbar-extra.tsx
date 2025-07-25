'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa' 
import React from 'react'

export default function NavbarExtra() {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <nav id="navbar" className="fixed rounded-b-md top-0 left-0 w-full bg-neutral-900 shadow z-50 transition-all duration-300 mb-7">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-sky-700">
          AYOLIN
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className={`md:flex md:space-x-8 font-semibold ${isOpen ? 'block mt-6 md:mt-0' : 'hidden'} md:block`}>
          <li>
            <Link
                href="/"
                className="hover:text-cyan-500 text-white"
            >
                Inicio
            </Link>
          </li>
          <li>
            <Link
                href="/auth/login"
                className="hover:text-cyan-500 text-white"
            >
                Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
