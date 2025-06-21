// components/Navbar.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow z-50">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
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
            <Link href="#home" className="text-white hover:text-cyan-600">Inicio</Link>
          </li>
          <li>
            <Link href="#features" className="text-white hover:text-cyan-600">TEXTO</Link>
          </li>
          <li>
            <Link href="#demo" className="text-white hover:text-cyan-600">TEXTO</Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:text-cyan-600">TEXTO</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
