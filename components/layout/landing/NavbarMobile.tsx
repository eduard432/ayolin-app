'use client'

import Link from 'next/link'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

type Props = {
  isLoggedIn: boolean
}

export default function NavbarMobile({ isLoggedIn }: Props) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          aria-label="Abrir menú"
          className="p-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition"
        >
          <Menu className="size-6" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-black text-white p-6"
          aria-describedby={undefined} 
        >
          {/* Título accesible (no visible) */}
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de navegación</SheetTitle>
            {/* <SheetDescription>Navega por las secciones del sitio</SheetDescription> */}
          </SheetHeader>

          <nav className="mt-6" aria-label="Navegación móvil">
            <ul className="flex flex-col gap-5 text-xl font-medium">
              <li>
                <SheetClose asChild>
                  <a href="#home" className="block hover:text-blue-300 text-2xl">Inicio</a>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <a href="#features" className="block hover:text-blue-300 text-2xl">Servicios</a>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <a href="#planes" className="block hover:text-blue-300 text-2xl">Planes</a>
                </SheetClose>
              </li>

              {isLoggedIn ? (
                <li>
                  <SheetClose asChild>
                    <Link href="/dashboard/general" className="block hover:text-blue-300 text-2xl">Tablero</Link>
                  </SheetClose>
                </li>
              ) : (
                <>
                  <li>
                    <SheetClose asChild>
                      <Link href="/auth/login" className="block hover:text-blue-300 text-2xl">Iniciar sesión</Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        href="/auth/register"
                        className="block text-center px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition"
                      >
                        Registrarse
                      </Link>
                    </SheetClose>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
