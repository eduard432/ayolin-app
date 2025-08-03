'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa' 
import { motion, AnimatePresence } from 'framer-motion'

export default function NavbarBLog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSlugPage = pathname.startsWith('/blog/') && pathname !== '/blog'

  return (
    <motion.nav
      id="navbar"
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
        }
      `}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center">
        <div className="flex items-center gap-10">
          {/* Logo AYOLIN */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
          >
            AYOLIN
          </Link>
          {isSlugPage && (
            <Link
              href="/blog"
              className="text-white hover:text-blue-300 text-lg flex items-center gap-1 font-black"
            >
              ← Regresar al Blog
            </Link>
          )}
        </div>

        {/* Botón hamburguesa en móvil */}
        <div className="md:hidden relative z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links (desktop siempre visibles, móvil con AnimatePresence) */}
        <ul
          className={`
            hidden md:flex md:space-x-8 text-lg font-medium
          `}
        >
          <li>
            <Link href="/" className="text-white hover:text-blue-300 transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/auth/login" className="text-white hover:text-blue-300 transition-colors">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              key="menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`
                fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-6 md:hidden
              `}
            >
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Dashboard
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
