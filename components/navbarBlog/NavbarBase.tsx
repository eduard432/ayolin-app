import Link from "next/link"

export default function NavbarBase() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-7 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
        >
          AYOLIN
        </Link>

        {/* Links (solo desktop visible sin JS) */}
        <ul className="hidden md:flex md:space-x-8 text-lg font-medium">
          <li><Link href="/" className="text-white hover:text-blue-300">Inicio</Link></li>
          <li><Link href="/auth/login" className="text-white hover:text-blue-300">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  )
}
