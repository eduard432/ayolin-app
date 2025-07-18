'use client'

import {
	InstallChannelButton,
	InstallToolButton,
} from '@/components/InstallButton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'

import { useIntegrations } from '@/data/integrations.client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const channels = ['telegram']

const IntegrationsPage = () => {
	const { data } = useIntegrations()
	const router = useRouter()
	const params = useParams()

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{data &&
				data.map((integration) => (
					<Card
						key={integration.keyName}
						className="pt-0 justify-start relative"
					>
						<CardHeader className="absolute right-20 top-4 z-10">
							<CardAction>
								{!channels.includes(integration.keyName) ? (
									<InstallToolButton
										variant="outline"
										className="cursor-pointer"
									/>
								) : (
									<InstallChannelButton
										chatbotId={params.chatbotId as string}
										keyName={integration.keyName}
										variant="outline"
										className="cursor-pointer"
									/>
								)}
							</CardAction>
						</CardHeader>
						<AspectRatio
							ratio={16 / 9}
							className={cn(
								'bg-muted rounded-lg rounded-b-none',
								!channels.includes(integration.keyName) && 'cursor-pointer'
							)}
							onClick={() =>
								!channels.includes(integration.keyName) &&
								router.push(
									`/dashboard/${params.chatbotId}/integraciones/${integration.keyName}`
								)
							}
						>
							<Image
								src={integration.imageUrl}
								alt={`Tool Function image for ${integration.name}`}
								fill
								className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
							/>
						</AspectRatio>
						<CardContent>
							<p className="font-semibold">{integration.name}</p>
							<p className="text-sm text-neutral-600 truncate">
								{integration.blogDescription}
							</p>
						</CardContent>
					</Card>
				))}
		</div>
	)
}

export default IntegrationsPage
