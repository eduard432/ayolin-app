'use client'

import { integrationsData } from '@/lib/integrationsData'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'

const CategoryButtons = () => {
	const params = useParams()

	return (
		<>
			<Button
				className={cn(
					'justify-start font-normal rounded-full',
					!params.category && 'bg-primary-foreground'
				)}
				variant="ghost"
				asChild
			>
				<Link
					href={`/dashboard/${params.chatbotId}/integraciones/marketplace`}
				>
					All Categories
				</Link>
			</Button>
			{Object.keys(integrationsData).map((category) => {
				return (
					<Button
						key={category}
						className={cn(
							'justify-start font-normal rounded-full',
							params.category == category && 'bg-primary-foreground font-bold'
						)}
						variant="ghost"
						asChild
					>
						<Link
							href={`/dashboard/${params.chatbotId}/integraciones/marketplace/categoria/${category}`}
							className="capitalize"
						>
							{category}
						</Link>
					</Button>
				)
			})}
		</>
	)
}

const CategoryNavbar = () => {
	const isMobile = useIsMobile()

	return (
		<>
			{isMobile ? (
				<Collapsible>
					<CollapsibleTrigger>
					<Button variant="ghost" >
						Categorias
					</Button>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<CategoryButtons />
					</CollapsibleContent>
				</Collapsible>
			) : (
				<CategoryButtons />
			)}
		</>
	)
}

export default CategoryNavbar
