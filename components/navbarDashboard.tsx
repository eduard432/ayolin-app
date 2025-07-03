'use client'

import Link from 'next/link'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { dashboardFeatures, getChatbotFeatures } from '@/lib/navbarData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

export default function NavbarDashboard() {
	const pathname = usePathname()
	const params = useParams()
	const chatbotId = params.chatbotId as string | undefined
	const { data: session, status } = useSession()

	const isLoading = status === 'loading'
	const isPro = session?.user?.isPro

	// Mientras carga la sesión, no mostramos nada (opcional)
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
	const showNavbar = features.map((f) => f.href).includes(pathname)

	return (
		<nav
			className={cn(
				'bg-white px-6 border-b border-neutral-300 pb-2 pt-2',
				!showNavbar && 'hidden'
			)}
		>
			{features.map((feature) => (
				<Button
					key={feature.href}
					asChild
					variant="ghost"
					className={cn(
						'hover:bg-neutral-200 text-base',
						pathname === feature.href
							? "relative text-neutral-900 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-black after:rounded-full"
							: 'text-neutral-500'
					)}
				>
					<Link href={feature.href}>{feature.name}</Link>
				</Button>
			))}
		</nav>
	)
}
