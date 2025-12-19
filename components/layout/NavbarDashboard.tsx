'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
	getAllowedNavbarRoutes,
	dashboardFeatures,
	getChatbotFeatures,
} from '@/lib/navbarData'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

export default function NavbarDashboard() {
	const pathname = usePathname()
	const params = useParams()
	const chatbotId = params.chatbotId as string | undefined
	const { data: session, status } = useSession()

	const isLoading = status === 'loading'
	const isPro = session?.user?.isPro

	// Mientras carga la sesión, no mostramos nada 
	if (isLoading) return null

	let features

	if (chatbotId) {
		features = getChatbotFeatures(chatbotId)
	} else {
		features = isPro
			? dashboardFeatures.filter((feature) => feature.name !== 'Pro')
			: dashboardFeatures
	}

	// Verificamos si la ruta actual corresponde a alguna de las pestañas
	const allowedNavbarRoutes = getAllowedNavbarRoutes(chatbotId)
	const showNavbar = allowedNavbarRoutes.includes(pathname)

	return (
		<nav
			className={cn(
				'bg-background px-6 border-b border-border pb-2 pt-2 overflow-x-auto flex flex-row w-full',
				!showNavbar && 'hidden'
			)}
		>
			{features.map((feature) => (
				<Link
					key={feature.href}
					href={feature.href}
					className={cn( buttonVariants({variant: "ghost"}),
						'hover:bg-muted text-base transition-colors duration-200',
						pathname === feature.href
							? "relative text-foreground after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:bg-foreground after:rounded-full"
							: 'text-muted-foreground'
					)}
				>
					{feature.name}
				</Link>
			))}
		</nav>
	)
}
