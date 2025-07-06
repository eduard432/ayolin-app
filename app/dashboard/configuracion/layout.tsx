import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const links = [
	{ name: 'Cuenta', href: '/dashboard/configuracion/cuenta' },
	{ name: 'Seguridad', href: '/dashboard/configuracion/seguridad' },
]

export default function ConfiguracionLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="min-h-screen text-foreground flex border-r">
			<Card className="w-[260px] p-6 border-r border-muted-foreground text-foreground bg-background px-2">
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

			<main className="flex-1 px-10 overflow-auto bg-background">
				{children}
			</main>
		</div>
	)
}
