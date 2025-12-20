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
import { IconMenu } from "@tabler/icons-react"

export default function NavbarMobile() {

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
                  <a onClick={close} href="/" className="block hover:text-blue-300 text-2xl">
                    Inicio
                  </a>
                </li>
                <li>
                  <a onClick={close} href="/dashboard/general" className="block hover:text-blue-300 text-2xl">
                    Tablero
                  </a>
                </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
