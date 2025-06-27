'use client'

import { integrationsData } from '@/lib/integrationsData'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const CategoryNavbar = () => {
	const params = useParams()

	return (
		<>
			<Button
				className={cn(
					'justify-start font-normal rounded-full',
					!params.category && 'bg-neutral-200'
				)}
				variant="secondary"
				asChild
			>
				<Link href={`/dashboard/${params.chatbotId}/integraciones/marketplace`}>All Categories</Link>
			</Button>
			{Object.keys(integrationsData).map((category) => {
                return (
                    <Button
					key={category}
					className={cn(
						'justify-start font-normal rounded-full',
						params.category ==
							category &&
							'bg-neutral-200 hover:bg-neutral-200'
					)}
					variant="secondary"
					asChild
				>
					<Link href={`/dashboard/${params.chatbotId}/integraciones/marketplace/categoria/${category}`} className="capitalize" >{category}</Link>
				</Button>
                )
            })}
		</>
	)
}

export default CategoryNavbar
