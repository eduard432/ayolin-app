import Link from 'next/link'
import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
			<Card className="col-span-full md:col-span-3">
				<CardHeader>
					<CardTitle className="text-3xl">Ajustes</CardTitle>
				</CardHeader>
				<CardContent>
					<nav >
						<ul >
							{links.map((link) => (
								<li key={link.href}>
									<Link 
										href={link.href}
										className={cn(buttonVariants ({variant: "link"}), "font-bold text-lg hover:text-sky-500 hover:no-underline underline-offset-0" )}
									>
										{link.name}
									</Link>
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
