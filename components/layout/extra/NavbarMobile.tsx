'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname() || ''
  const onCondiciones = pathname.startsWith('/condiciones-servicios')
  const onPrivacidad = pathname.startsWith('/politica-privacidad')
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
              {/* Mostrar solo el enlace de la página legal en la que NO estamos */}
              {onCondiciones && (
                <li>
                  <SheetClose asChild>
                    <Link href="/politica-privacidad" className="block hover:text-blue-300 text-2xl">
                      Política de privacidad
                    </Link>
                  </SheetClose>
                </li>
              )}
              {onPrivacidad && (
                <li>
                  <SheetClose asChild>
                    <Link href="/condiciones-servicios" className="block hover:text-blue-300 text-2xl">
                      Condiciones de servicio
                    </Link>
                  </SheetClose>
                </li>
              )}
              {!onCondiciones && !onPrivacidad && (
                <>
                  <li>
                    <SheetClose asChild>
                      <Link href="/condiciones-servicios" className="block hover:text-blue-300 text-2xl">
                        Condiciones de servicio
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link href="/politica-privacidad" className="block hover:text-blue-300 text-2xl">
                        Política de privacidad
                      </Link>
                    </SheetClose>
                  </li>
                </>
              )}
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
