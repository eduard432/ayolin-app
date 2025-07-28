'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa' 
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Link href="/" className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            AYOLIN
          </Link>
        </motion.div>

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
            <a href="#home" className="text-white hover:text-blue-300 transition-colors">
              Inicio
            </a>
          </li>
          <li>
            <a href="#features" className="text-white hover:text-blue-300 transition-colors">
              Servicios
            </a>
          </li>
          <li>
            <a href="#planes" className="text-white hover:text-blue-300 transition-colors">
              Planes
            </a>
          </li>
          <li>
            <Link href="/auth/login" className="text-white hover:text-blue-300 transition-colors">
              Login
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
              {/* Botón cerrar */}

              <li>
                <a href="#home" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#planes" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Planes
                </a>
              </li>
              <li>
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:text-blue-300">
                  Login
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
