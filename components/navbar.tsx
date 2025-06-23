// components/Navbar.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa' 
import React from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to update isScrolled
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="navbar" className="fixed rounded-b-md top-0 left-0 w-full bg-neutral-900 shadow z-50 transition-all duration-300">
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
                className={`hover:text-cyan-600 ${
                    isScrolled ? 'text-black' : 'text-white'
                }`}
                >
                Inicio
            </Link>
          </li>
          <li>
            <Link
                href="/"
                className={`hover:text-cyan-600 ${
                    isScrolled ? 'text-black' : 'text-white'
                }`}
                >
                TEXTO
            </Link>
          </li>
          <li>
            <Link
                href="/"
                className={`hover:text-cyan-600 ${
                    isScrolled ? 'text-black' : 'text-white'
                }`}
                >
                TEXTO
            </Link>
          </li>
          <li>
            <Link
                href="/auth/login"
                className={`hover:text-cyan-600 ${
                    isScrolled ? 'text-black' : 'text-white'
                }`}
                >
                Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
