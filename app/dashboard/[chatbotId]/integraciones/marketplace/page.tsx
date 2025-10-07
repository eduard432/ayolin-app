'use client'

import { TelegramIntegrationCard } from '@/components/channels/TelegramCard'
import {
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

import { useToolFunctions } from '@/data/integrations/integrations.client'
import { cn } from '@/lib/utils'
import { Chatbot } from '@prisma/client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ToolFunctionCard } from '@/components/integrations/ToolFunctionCard'

const IntegrationsPage = () => {
	const { data: toolFunctions } = useToolFunctions()
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { isLoading, data: chatbot } = useChatbot(chatbotId)

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{isLoading &&
				Array.from({ length: 3 }).map((_, i) => {
					return <IntegrationCardSkeleton key={i} />
				})}

			{toolFunctions &&
				chatbot &&
				toolFunctions.map((integration) => (
					<ToolFunctionCard
						chatbot={chatbot}
						key={integration.keyName}
						toolFunction={integration}
					/>
				))}
			{chatbot && (
				<TelegramIntegrationCard
					chatbotId={chatbot.id}
					imageUrl="https://jiaq9ymgisc0ie2r.public.blob.vercel-storage.com/telegram_channel.png"
				/>
			)}
		</div>
	)
}

export default IntegrationsPage
