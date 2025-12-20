// Nueva navbar, es diferente a la que teniamos antes

"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { IconMenu } from "@tabler/icons-react"

type Props = {
  isLoggedIn: boolean
}

export default function NavbarMobile({ isLoggedIn }: Props) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
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
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de navegación</SheetTitle>
          </SheetHeader>

          <nav className="mt-6" aria-label="Navegación móvil">
            <ul className="flex flex-col gap-5 text-xl font-medium">
              <li>
                <a onClick={close} href="#home" className="block hover:text-blue-300 text-2xl">
                  Inicio
                </a>
              </li>
              <li>
                <a onClick={close} href="#features" className="block hover:text-blue-300 text-2xl">
                  Servicios
                </a>
              </li>
              <li>
                <a onClick={close} href="#planes" className="block hover:text-blue-300 text-2xl">
                  Planes
                </a>
              </li>

              {isLoggedIn ? (
                <li>
                  <Link
                    onClick={close}
                    href="/dashboard/general"
                    className="block hover:text-blue-300 text-2xl"
                  >
                    Tablero
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      onClick={close}
                      href="/auth/login"
                      className="block hover:text-blue-300 text-2xl"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={close}
                      href="/auth/register"
                      className="block text-center px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition"
                    >
                      Registrarse
                    </Link>
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