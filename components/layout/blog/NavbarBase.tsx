'use client'

import Link from "next/link"
import NavbarMobile from "./NavbarMobile"
import { usePathname } from "next/navigation"

export default function NavbarBase() {
  const pathname = usePathname()
  const isPostPage = pathname.startsWith('/blog') && pathname !== '/blog'

  return (
    <nav
      data-navbar="extra"
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:bg-black/40 data-[scrolled=true]:border-b data-[scrolled=true]:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
          >
            AYOLIN
          </Link>
          {isPostPage && (
            <Link
              href="/blog"
              className="text-white hover:text-blue-300 font-black"
            >
              ← Regresar al Blog
            </Link>
          )}
        </div>

        {/* Menú móvil accesible con Sheet */}
        <NavbarMobile />

        {/* Menú desktop */}
        <ul className="hidden md:flex md:space-x-8 text-lg font-medium items-center">
          <li>
            <Link href="/" className="text-white hover:text-blue-300">Inicio</Link>
          </li>
          <li>
            <Link href="/dashboard/general" className="text-white hover:text-blue-300">Tablero</Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}
