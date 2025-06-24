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

{/*No me encanta como se ve, podemos cambiar el hover pero no 
  se como se puede ver mejor */}

export default function NavbarDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const features: Feature[] =
    pathname?.includes('/dashboard/') && pathname?.split('/').length > 3
      ? chatbotFeatures
      : dashboardFeatures

  return (
    <nav className="fixed top-16 left-0 w-full bg-neutral-900 shadow-md z-40 rounded-b-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Botón hamburguesa (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Enlaces */}
        <ul
          className={`md:flex md:space-x-6 font-medium text-white transition-all duration-300 ease-in-out ${
            isOpen ? 'block mt-4 space-y-2' : 'hidden'
          } md:block md:mt-0 md:space-y-0`}
        >
          {features.map((item: Feature) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-2 px-4 rounded-md transition-all duration-200
                    ${
                      isActive
                        ? 'bg-sky-700 text-white'
                        : 'hover:bg-neutral-800 hover:text-sky-300'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
