import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center relative">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
        >
          AYOLIN
        </Link>

        {/* Toggle checkbox (para abrir/cerrar menú en mobile) */}
        <input id="menu-toggle" type="checkbox" className="peer hidden" />

        {/* Icono hamburguesa */}
        <label htmlFor="menu-toggle" className="md:hidden flex flex-col justify-center items-center cursor-pointer w-8 h-8 z-50">
          <span className="block w-6 h-0.5 bg-white mb-1 transition-all"></span>
          <span className="block w-6 h-0.5 bg-white mb-1 transition-all"></span>
          <span className="block w-6 h-0.5 bg-white transition-all"></span>
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
              Login
            </Link>
          </li>
        </ul>

        {/* Menú móvil (peer-checked visible) */}
        <ul className="peer-checked:flex hidden absolute top-full left-0 w-full bg-black border-b border-white/20 flex-col items-center gap-6 py-8 md:hidden z-40">
          <li>
            <Link href="/" className="text-white text-lg hover:text-blue-300 transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/auth/login" className="text-white text-lg hover:text-blue-300 transition-colors">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
