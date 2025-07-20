import Link from 'next/link'
import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

const links = [
	{ name: 'Cuenta', href: '/dashboard/configuracion/cuenta' },
	{ name: 'Pagos', href: '/dashboard/configuracion/pagos' },
]

export const metadata: Metadata = {
  title: "Configuración",
  description: "Build your own chatbot",
};

export default function ConfiguracionLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="min-h-screen text-foreground grid grid-cols-1 md:grid-cols-12 gap-8">
			<Card className="col-span-full md:col-span-3 bg-background">
				<CardHeader>
					<CardTitle className="text-3xl">Ajustes</CardTitle>
				</CardHeader>
				<CardContent>
					<nav className="">
						<ul className="">
							{links.map((link) => (
								<li key={link.href}>
									<Button variant="link" asChild >
										<Link href={link.href}>{link.name}</Link>
									</Button>
								</li>
							))}
						</ul>
					</nav>
				</CardContent>
			</Card>

			<main className="col-span-full md:col-span-9">{children}</main>
		</div>
	)
}
