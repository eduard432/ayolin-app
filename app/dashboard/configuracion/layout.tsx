import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const links = [
	{ name: 'Cuenta', href: '/dashboard/configuracion/cuenta' },
	{ name: 'Miembros', href: '/dashboard/configuracion/' },
	{ name: 'Facturación', href: '/dashboard/configuracion/' },
	{ name: 'Preferencias', href: '/dashboard/configuracion/' },
	{ name: 'Seguridad', href: '/configuracion/seguridad' },
	{ name: 'Autenticación', href: '/configuracion/autenticacion' },
	{ name: 'Notificaciones', href: '/configuracion/notificaciones' },
	{ name: 'Integraciones', href: '/configuracion/integraciones' },
	{ name: 'Dominios', href: '/configuracion/dominios' },
	{ name: 'Historial de actividad', href: '/configuracion/historial' },
	{ name: 'Accesos API', href: '/configuracion/api' },
	{ name: 'Eliminar cuenta', href: '/configuracion/eliminar' },
]

export default function ConfiguracionLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="min-h-screen text-black flex border-r">
			<Card className="w-[260px] p-6 border-r border-neutral-300 text-black bg-white px-2">
				<CardHeader>
					<CardTitle className="text-3xl">Ajustes</CardTitle>
				</CardHeader>
				<CardContent>
					<nav className="">
						<ul className="space-y-2">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className={cn(
											'block px-3 py-2 rounded-md text-1xl hover:text-sky-600'
										)}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</CardContent>
			</Card>

			<main className="flex-1 px-10 overflow-auto bg-neutral-100">
				{children}
			</main>
		</div>
	)
}
