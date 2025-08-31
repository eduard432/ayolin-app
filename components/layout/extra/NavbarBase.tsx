import Link from "next/link"
import { auth } from "@/lib/auth"
import NavbarMobile from "./NavbarMobile"

export default async function NavbarBase() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav
      data-navbar="landing"
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:bg-black/40 data-[scrolled=true]:border-b data-[scrolled=true]:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
        >
          AYOLIN
        </Link>

        {/* Menú móvil accesible con Sheet */}
        <NavbarMobile isLoggedIn={isLoggedIn} />

        {/* Menú desktop */}
        <ul className="hidden md:flex md:space-x-8 text-lg font-medium items-center">
          <li><a href="#home" className="text-white hover:text-blue-300">Inicio</a></li>
          {isLoggedIn ? (
            <li>
              <Link href="/dashboard/general" className="text-white hover:text-blue-300">Tablero</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/auth/login" className="text-white hover:text-blue-300">Iniciar sesión</Link>
              </li>
              <li>
                <Link href="/auth/register" className="px-4 py-2 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
