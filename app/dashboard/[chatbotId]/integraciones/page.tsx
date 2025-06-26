"use client"

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
import { Layers } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

const integrations = [
	{
		name: 'Neon',
		status: 'Billed Via Vercel',
		category: 'Storage',
		updated: 'Jan 16',
	},
	{
		name: 'Shopify',
		status: 'Deprecated',
		category: 'Commerce',
		updated: '8/14/23',
	},
]

const IntegrationsPage = () => {

    const router = useRouter()

	return (
		<div className="grid grid-cols-12 gap-x-8 gap-y-4">
			<section className="flex justify-between col-span-12">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Integraciones
				</h4>
				<Button>Browse Marketplace</Button>
			</section>
			<section className="col-span-8">
				{integrations.map((integration) => (
					<Card
						className="first:rounded-t-md last:rounded-b-md rounded-none py-4 cursor-pointer"
						key={integration.name}
						onClick={() =>
							router.push(`/dashboard/integrations/${integration.name}`)
						}
					>
						<CardContent className="flex justify-between items-center">
							<div className="flex items-center gap-x-4">
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-medium">{integration.name}</h4>
									<p className="text-sm font-medium text-neutral-500">
										{integration.category}
									</p>
								</div>
							</div>
							<Button onClick={() => router.push(`/dashboard/integrations/${integration.name}`)} variant="outline" >Manage</Button>
						</CardContent>
					</Card>
				))}
			</section>
			<section className="col-span-4">
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
							<div key={integration.name} className="flex items-center gap-x-4 cursor-pointer">
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
