import Link from 'next/link'

interface NavbarBLogProps {
  showBackButton?: boolean
}

export default function NavbarBLog({ showBackButton = false }: NavbarBLogProps) {
  return (
    <div
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 bg-slate-800 border-b border-black/30 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center relative">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
          >
            AYOLIN
          </Link>
          {/* Botón de regresar si aplica */}
          {showBackButton && (
            <Link
              href="/blog"
              className="text-white text-lg font-black md:text-base hover:text-blue-300 transition-colors"
            >
              ← Volver al Blog
            </Link>
          )}
        </div>

        {/* Checkbox (oculto) */}
        <input id="menu-toggle" type="checkbox" className="hidden peer" />

        {/* Hamburger icon */}
        <label htmlFor="menu-toggle" className="md:hidden flex flex-col justify-center items-center cursor-pointer w-8 h-8">
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </label>

        {/* Links (desktop) */}
        <ul className="hidden md:flex md:space-x-8 text-lg font-medium">
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
        <ul className="peer-checked:flex hidden absolute top-full right-0 w-full bg-slate-800 border-b border-white/10 flex-col items-center gap-6 py-8 md:hidden z-40">
          <li>
            <Link href="/" className="text-white text-lg hover:text-blue-300 transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/auth/login" className="text-white text-lg hover:text-blue-300 transition-colors">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
