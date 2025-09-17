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
import { useChatbot } from '@/data/chatbot/chatbot.client'
import { JsonValue } from '@prisma/client/runtime/library'
import { Skeleton } from '@/components/ui/skeleton'
import type { LucideIcon } from 'lucide-react'
import {
	Cpu, 
	Zap, 
	Brain,
	Database,
	Activity,
	Puzzle,
} from "lucide-react"
import { cn, toTitleCase } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	RemoveChannelButton,
	RemoveToolButton,
} from '@/components/integrations/RemoveButton'

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

const latestIntegrationsVisuals: Record<
	string, 
	{ icon: LucideIcon; bg: string, fg:string, ring: string, src?: string }
> = {
  "Deep Infra": { icon: Cpu,     bg: "bg-blue-500/10",    fg: "text-blue-400",    ring: "ring-blue-500/20" },
  "Groq":       { icon: Zap,     bg: "bg-amber-500/10",   fg: "text-amber-400",   ring: "ring-amber-500/20" },
  "xAI":        { icon: Brain,   bg: "bg-violet-500/10",  fg: "text-violet-400",  ring: "ring-violet-500/20" },
  "Prisma":     { icon: Database,bg: "bg-emerald-500/10", fg: "text-emerald-400", ring: "ring-emerald-500/20" },
  "Dash0":      { icon: Activity,bg: "bg-fuchsia-500/10", fg: "text-fuchsia-400", ring: "ring-fuchsia-500/20" },
}

const defaultVisual = { icon: Puzzle, bg: "bg-slate-500/10", fg: "text-slate-400", ring: "ring-slate-500/20" }
const getVisual = ( name: string) => latestIntegrationsVisuals[name] ?? defaultVisual

const IntegrationCard = ({
	integration,
	isTool = true,
}: {
	integration: { keyName: string; settings: JsonValue }
	isTool?: boolean
}) => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string
	const { data } = useChatbot(chatbotId)

	return (
		<>
			{data && (
				<Card
					className="first:rounded-t-md last:rounded-b-md rounded-none py-4"
					key={integration.keyName}
				>
					<CardContent className="flex justify-between items-center">
						<div className="flex items-center gap-x-4">
							{(() => {
								const v = getVisual(integration.keyName)
								const Icon = v.icon
								return(
									<Avatar className={cn("w-10 h-10 ring-1", v.ring)}>
										{v.src ? (
											<AvatarImage src={v.src } alt={integration.keyName} />
										) : (
											<AvatarFallback
												className={cn(
													"w-full h-full flex items-center justify-center rounded-full",
													v.bg,
													v.fg
												)}
												aria-label={integration.keyName}
											>
												<Icon className='w-5 h-5' />
											</AvatarFallback>
										)}
									</Avatar>
								)
							})()}
							<div>
								<h4 className="font-medium capitalize">{toTitleCase(integration.keyName)}</h4>
								<p className="text-sm font-medium text-neutral-500">
									{isTool ? 'Herramienta' : 'Canal'}
								</p>
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
									{isTool ? (
										<RemoveToolButton
											keyName={integration.keyName}
											chatbot={data}
										/>
									) : (
										<RemoveChannelButton
											keyName={integration.keyName}
											chatbot={data}
										/>
									)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardContent>
				</Card>
			)}
		</>
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
						Explorar Marketplace
					</Link>
				</Button>
			</section>
			<section className="col-span-full md:col-span-8">
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
					: data && (
							<>
								{data.tools.map((integration) => (
									<IntegrationCard
										key={integration.keyName}
										integration={integration}
										isTool={true}
									/>
								))}
								{data.channels.map((integration) => (
									<IntegrationCard
										key={integration.keyName}
										integration={integration}
										isTool={false}
									/>
								))}
							</>
						)}

				{!isLoading &&
					data &&
					data.tools.length === 0 &&
					data.channels.length === 0 && (
						<Card className="col-span-full min-h-64 md:min-h-80 h-full">
							<CardContent className="flex flex-col gap-y-8 items-center justify-center h-full">
								<h4 className="text-xl font-semibold text-muted-foreground">
									¡Explora las integraciones más útiles!
								</h4>
								<Button variant="outline" asChild>
									<Link
										href={`/dashboard/${params.chatbotId}/integraciones/marketplace`}
									>
										Explorar Marketplace
									</Link>
								</Button>
							</CardContent>
						</Card>
					)}
			</section>
			<section className="col-span-full md:col-span-4">
				<Card className="py-10 px-4">
					<CardHeader>
						<div className="flex justify-center mb-4">
							<Layers />
						</div>
						<CardTitle className="text-center">Ultimas integraciones</CardTitle>
						<CardDescription className="text-center">
							Explora mas integraciones para conectar a tu chatbot
						</CardDescription>
					</CardHeader>
					<CardContent className="gap-y-6 flex flex-col">
						{latestIntegrations.map((integration) => (
							<div
								key={integration.name}
								className="flex items-center gap-x-4 cursor-pointer"
							>
								{(() => {
									const v = getVisual(integration.name)
									const Icon = v.icon
									return(
										<Avatar className={cn("w-10 h-10 ring-1", v.ring)}>
											{v.src ? (
												<AvatarImage src={v.src} alt={integration.name}/>
											) : (
												<AvatarFallback
													className={cn(
														"w-full h-full flex items-center justify-center rounded-full",
														v.bg,
														v.fg
													)}
													aria-label={integration.name}
												>
													<Icon className="h-5 w-5"/>
												</AvatarFallback>
											)}
										</Avatar>
									)
								})()}
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
