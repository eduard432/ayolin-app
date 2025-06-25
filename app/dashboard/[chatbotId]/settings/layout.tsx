// app/configuracion/layout.tsx
'use client'

import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"

const linksBase = [
  'general',
  'miembros',
  'facturacion',
  'preferencias',
  'seguridad',
  'autenticacion',
  'notificaciones',
  'integraciones',
  'dominios',
  'historial',
  'api',
  'eliminar',
]


export default function ConfiguracionLayout({ children }: { children: ReactNode }) {
    const params = useParams()
    const chatbotId = params?.chatbotId as string
  return (
    <div className="min-h-screen text-white  flex">
      
      <aside className="w-70 bg-neutral-900 border-r border-neutral-800 p-6 fixed top-30 left-0 bottom-0">
        <nav className="space-y-4">
          <h2 className="font-semibold mb-6 text-2xl mt-4">Ajustes</h2>
          <ul className="space-y-2">
            {linksBase.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/dashboard/${chatbotId}/configuracion/${slug}`}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base hover:text-sky-600"
                  )}
                >
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      
      <main className="flex-1 pt-0 px-6 pb-6 ml-68 bg-neutral-200">
        {children}
      </main>
    </div>
  )
}
