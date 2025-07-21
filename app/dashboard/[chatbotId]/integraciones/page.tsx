'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Ellipsis, Layers } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useChatbot } from '@/data/chatbot.client'
import { JsonValue } from '@prisma/client/runtime/library'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import RemoveToolButton from '@/components/integrations/RemoveToolButton'

const latestIntegrations = [
	{
		name: 'Deep Infra',
		description: 'Deep Infra AI integration',
	},
	{
		name: 'Groq',
		description: 'Fast Inference for AI Applications',
	},
	{
		name: 'xAI',
		description: 'Grok by xAI',
	},
	{
		name: 'Prisma',
		description: 'Serverless Postgres without Cold Starts',
	},
	{
		name: 'Dash0',
		description: 'Logs, Traces and Metrics',
	},
]

const IntegrationCard = ({
	integration,
}: {
	integration: { keyName: string; settings: JsonValue }
}) => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string
	const { data } = useChatbot(chatbotId)

	return (
		<Card
			className="first:rounded-t-md last:rounded-b-md rounded-none py-4"
			key={integration.keyName}
		>
			<CardContent className="flex justify-between items-center">
				<div className="flex items-center gap-x-4">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h4 className="font-medium">{integration.keyName}</h4>
						<p className="text-sm font-medium text-neutral-500">Categoría</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="cursor-pointer" variant="ghost">
							<Ellipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							{data && <RemoveToolButton keyName={integration.keyName} chatbot={data} />}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardContent>
		</Card>
	)
}

const SkeletonCard = () => {
	return (
		<Card
			className={cn(
				'rounded-none py-4 col-span-full first:rounded-t-md last:rounded-b-md'
			)}
		>
			<CardContent className="flex justify-between">
				<div className="flex items-center gap-x-4">
					{/* Avatar skeleton */}
					<Skeleton className="h-10 w-10 rounded-full" />

					<div className="space-y-2">
						{/* Chatbot name skeleton */}
						<Skeleton className="h-4 w-[120px]" />
						{/* Model name skeleton */}
						<Skeleton className="h-3 w-[80px]" />
					</div>
				</div>

				{/* Dropdown menu button skeleton */}
				<Skeleton className="h-9 w-9 rounded-md" />
			</CardContent>
		</Card>
	)
}

const IntegrationsPage = () => {
	const params = useParams()

	const chatbotId = params?.chatbotId as string

	const { data, isLoading } = useChatbot(chatbotId)

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4">
			<section className="flex flex-col md:flex-row md:justify-between col-span-full">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Integraciones
				</h4>
				<Button asChild>
					<Link
						href={`/dashboard/${params.chatbotId}/integraciones/marketplace`}
					>
						Browse Marketplace
					</Link>
				</Button>
			</section>
			<section className="col-span-full md:col-span-8">
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
					: data &&
						data.tools.map((integration) => (
							<IntegrationCard
								key={integration.keyName}
								integration={integration}
							/>
						))}
			</section>
			<section className="col-span-full md:col-span-4">
				<Card className="py-10 px-4">
					<CardHeader>
						<div className="flex justify-center mb-4">
							<Layers />
						</div>
						<CardTitle className="text-center">Latest Integrations</CardTitle>
						<CardDescription className="text-center">
							Explore more integrations to expand yout Chatbot
						</CardDescription>
					</CardHeader>
					<CardContent className="gap-y-6 flex flex-col">
						{latestIntegrations.map((integration) => (
							<div
								key={integration.name}
								className="flex items-center gap-x-4 cursor-pointer"
							>
								<Avatar className="w-10 h-10">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div>
									<h6 className="font-bold">{integration.name}</h6>
									<p className="text-neutral-500">{integration.description}</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</div>
	)
}

export default IntegrationsPage
