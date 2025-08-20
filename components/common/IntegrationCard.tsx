'use client'

import {
	InstallChannelButton,
	InstallToolButton,
} from '@/components/integrations/InstallButton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { Channel, Chatbot, ToolFunction } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const channels = ['telegram']

export const IntegrationCardSkeleton = () => {
	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<Skeleton className="h-9 w-20" />
			</CardHeader>

			<AspectRatio
				ratio={16 / 9}
				className={cn('bg-muted rounded-lg rounded-b-none')}
			>
				<Skeleton className="h-full w-full rounded-lg rounded-b-none" />
			</AspectRatio>

			<CardContent>
				<Skeleton className="h-5 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full" />
			</CardContent>
		</Card>
	)
}

export const IntegrationCard = ({
	integration,
	chatbot,
}: {
	integration: ToolFunction | Channel
	chatbot: Chatbot
}) => {
	const router = useRouter()

	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<CardAction>
					{!channels.includes(integration.keyName) ? (
						<InstallToolButton
							variant="outline"
							className="cursor-pointer"
							chatbot={chatbot}
							keyName={integration.keyName}
						/>
					) : (
						<InstallChannelButton
							chatbotId={chatbot.id}
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
						`/dashboard/${chatbot.id}/integraciones/${integration.keyName}`
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
	)
}
