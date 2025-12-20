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
import { IconMenu } from "@tabler/icons-react"

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
          <IconMenu className="size-6" />
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
                  <a onClick={close} href="/" className="block hover:text-blue-300 text-2xl">Inicio</a>
              </li>
              {/* Mostrar solo el enlace de la página legal en la que NO estamos */}
              {onCondiciones && (
                <li>
                    <a onClick={close} href="/politica-privacidad" className="block hover:text-blue-300 text-2xl">
                      Política de privacidad
                    </a>
                </li>
              )}
              {onPrivacidad && (
                <li>
                    <a onClick={close} href="/condiciones-servicios" className="block hover:text-blue-300 text-2xl">
                      Condiciones de servicio
                    </a>
                </li>
              )}
              {!onCondiciones && !onPrivacidad && (
                <>
                  <li>
                      <a onClick={close} href="/condiciones-servicios" className="block hover:text-blue-300 text-2xl">
                        Condiciones de servicio
                      </a>
                  </li>
                  <li>
                      <a onClick={close} href="/politica-privacidad" className="block hover:text-blue-300 text-2xl">
                        Política de privacidad
                      </a>
                  </li>
                </>
              )}
              {isLoggedIn ? (
                <li>
                    <a onClick={close} href="/dashboard/general" className="block hover:text-blue-300 text-2xl">Tablero</a>
                </li>
              ) : (
                <>
                  <li>
                      <a onClick={close} href="/auth/login" className="block hover:text-blue-300 text-2xl">Iniciar sesión</a>
                  </li>
                  <li>
                      <a
                        onClick={close}
                        href="/auth/register"
                        className="block text-center px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition"
                      >
                        Registrarse
                      </a>
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
