'use client'

import { TelegramIntegrationCard } from '@/components/channels/TelegramCard'
import {
	IntegrationCard,
	IntegrationCardSkeleton,
} from '@/components/common/IntegrationCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'
import { useChatbot } from '@/data/chatbot/chatbot.client'

import { useIntegrations } from '@/data/integrations/integrations.client'
import { cn } from '@/lib/utils'
import { Chatbot } from '@prisma/client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const CustomToolCard = ({ chatbot }: { chatbot: Chatbot }) => {
	const router = useRouter()

	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<CardAction>
					<Button
						onClick={() =>
							router.push(`/dashboard/${chatbot.id}/integraciones/custom-tool`)
						}
						variant="outline"
					>
						Agregar
					</Button>
				</CardAction>
			</CardHeader>
			<AspectRatio
				ratio={16 / 9}
				className={cn('bg-muted rounded-lg rounded-b-none')}
			>
				<Image
					src="https://jiaq9ymgisc0ie2r.public.blob.vercel-storage.com/custom-fetch_tool.webp"
					alt={`Tool Function image for custom tool`}
					fill
					className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
				/>
			</AspectRatio>
			<CardContent>
				<p className="font-semibold text-center">Integración personalizada</p>
				<p className="text-sm text-neutral-600 truncate">
					Personaliza tu propia función de fetch
				</p>
			</CardContent>
		</Card>
	)
}

const IntegrationsPage = () => {
	const { data: integrations } = useIntegrations()
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { isLoading, data: chatbot } = useChatbot(chatbotId)

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{isLoading &&
				Array.from({ length: 3 }).map((_, i) => {
					return <IntegrationCardSkeleton key={i} />
				})}
			{integrations &&
				chatbot &&
				integrations.map((integration) => (
					<IntegrationCard
						chatbot={chatbot}
						key={integration.keyName}
						integration={integration}
						chatbotId={chatbot.id}
					/>
				))}
			{chatbot && (
				<TelegramIntegrationCard
					chatbotId={chatbot.id}
					imageUrl="https://jiaq9ymgisc0ie2r.public.blob.vercel-storage.com/telegram_channel.png"
				/>
			)}
			{chatbot && (
				<>
					<CustomToolCard chatbot={chatbot} />
				</>
			)}
		</div>
	)
}

export default IntegrationsPage
