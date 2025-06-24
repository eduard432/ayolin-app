// components/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import React from 'react'
import { usePathname } from 'next/navigation'
import { dashboardFeatures, chatbotFeatures } from '@/lib/navbarData'

interface Feature {
  name: string
  href: string
}

export default function NavbarDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Decide qué menú mostrar según la ruta
  const features: Feature[] = pathname?.includes('/dashboard/') && pathname?.split('/').length > 3
    ? chatbotFeatures
    : dashboardFeatures

  return (
    <nav className="fixed top-16 left-0 w-full bg-neutral-900 shadow z-40 rounded-b-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Enlaces */}
        <ul
          className={`md:flex md:space-x-8 font-semibold text-white transition-all duration-300 ${
            isOpen ? 'block mt-4' : 'hidden'
          } md:block`}
        >
          {features.map((item: Feature) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block py-2 px-3 rounded hover:bg-sky-700 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
