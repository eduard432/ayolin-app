'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'

import { useToolFunctions } from '@/data/toolFunctions.client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const IntegrationsPage = () => {
	const { data } = useToolFunctions()
	const router = useRouter()
  const params = useParams()

	return (
		<div className="grid grid-cols-3 gap-6">
			{data &&
				data.map((toolFunction) => (
					<Card
						key={toolFunction.keyName}
						className="pt-0 justify-start relative"
					>
						<CardHeader className="absolute right-20 top-4 z-10">
							<CardAction>
								<Button variant="outline" >Instalar</Button>
							</CardAction>
						</CardHeader>
						<AspectRatio
							ratio={16 / 9}
							className="bg-muted rounded-lg rounded-b-none cursor-pointer"
							onClick={() => router.push(`/dashboard/${params.chatbotId}/integraciones/${toolFunction.keyName}`)}
						>
							<Image
								src={toolFunction.imageUrl}
								alt={`Tool Function image for ${toolFunction.name}`}
								fill
								className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
							/>
						</AspectRatio>
						<CardContent>
							<p className="font-semibold">{toolFunction.name}</p>
							<p className="text-sm text-neutral-600 truncate">
								{toolFunction.blogDescription}
							</p>
						</CardContent>
					</Card>
				))}
		</div>
	)
}

export default IntegrationsPage
