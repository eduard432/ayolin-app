// app/configuracion/layout.tsx
import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const links = [
  { name: "General", href: "/configuracion/general" },
  { name: "Miembros", href: "/configuracion/miembros" },
  { name: "Facturación", href: "/configuracion/facturacion" },
  { name: "Preferencias", href: "/configuracion/preferencias" },
  { name: "Seguridad", href: "/configuracion/seguridad" },
  { name: "Autenticación", href: "/configuracion/autenticacion" },
  { name: "Notificaciones", href: "/configuracion/notificaciones" },
  { name: "Integraciones", href: "/configuracion/integraciones" },
  { name: "Dominios", href: "/configuracion/dominios" },
  { name: "Historial de actividad", href: "/configuracion/historial" },
  { name: "Accesos API", href: "/configuracion/api" },
  { name: "Eliminar cuenta", href: "/configuracion/eliminar" }
]


export default function ConfiguracionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      
      <aside className="w-70 bg-neutral-900 border-r border-neutral-800 p-6">
        <nav className="space-y-4">
          <h2 className="font-semibold mb-6 text-2xl mt-4">Ajustes</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-1xl hover:text-sky-600"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 overflow-auto bg-neutral-200">
        {children}
      </main>
    </div>
  )
}
