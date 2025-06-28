'use client'

import Link from 'next/link'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { dashboardFeatures, getChatbotFeatures } from '@/lib/navbarData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NavbarDashboard() {
	const pathname = usePathname()

	// Determinar si estamos en /dashboard/[chatbotId]
	const params = useParams()
	const chatbotId = params.chatbotId as string | undefined

	// Seleccionamos los features según la ruta
	const features = chatbotId
		? getChatbotFeatures(chatbotId)
		: dashboardFeatures

	return (
		<nav
			className={cn(
				'bg-white px-6 border-b border-neutral-300 pb-2 pt-2',
				!features.map((f) => f.href).includes(pathname) && 'hidden'
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
