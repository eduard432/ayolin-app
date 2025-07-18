'use client'

import { SearchBar } from '@/components/search-bar'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { PayWithStripe } from '@/components/stripe-button'
import { CircularProgressBar } from '@/components/ui/circular-progress-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Ellipsis, LayoutGrid, List, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useChatbots } from '@/data/chatbot.client'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'

const usageMetrics = [
	{
		label: 'Blob Data Storage',
		used: '17,95 MB',
		limit: '1 GB',
	},
	{
		label: 'Blob Advanced Operations',
		used: '5',
		limit: '2K',
	},
	{
		label: 'Blob Simple Operations',
		used: '5',
		limit: '10K',
	},
	{
		label: 'Image Optimization - Transformations',
		used: '2',
		limit: '5K',
	},
	{
		label: 'Image Optimization - Cache Writes',
		used: '16',
		limit: '100K',
	},
	{
		label: 'Edge Requests',
		used: '99',
		limit: '1M',
	},
	{
		label: 'Fast Origin Transfer',
		used: '843,29 kB',
		limit: '10 GB',
	},
]

const DashboardOverview = () => {
	const [layout, setLayout] = useState<'grid' | 'list'>('list')
	const router = useRouter()
	const { data: session } = useSession()

	const { data, isLoading } = useChatbots(session?.user?.id || '')
	const isMobile = useIsMobile()

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 md:gap-y-2">
			<section className="flex items-center gap-x-4 col-span-full">
				<SearchBar className="h-full bg-background rounded-md" />
				{!isMobile && (
					<ToggleGroup
						value={layout}
						onValueChange={(value) => setLayout(value as 'grid' | 'list')}
						type="single"
						className="border h-full bg-background"
					>
						<ToggleGroupItem
							value="grid"
							aria-label="Toggle grid"
							className="rounded-md m-1 p-4 w-2 h-2 cursor-pointer bg-background"
						>
							<LayoutGrid className="" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="list"
							aria-label="Toggle list"
							className="rounded-md m-1 p-4 w-2 h-2 cursor-pointer bg-background"
						>
							<List className="" />
						</ToggleGroupItem>
					</ToggleGroup>
				)}
				<Button size={isMobile ? "icon" : "default"} asChild>
					<Link href="/dashboard/nuevo">
						{isMobile ? <Plus /> : 'Add New'}
					</Link>
				</Button>
			</section>
			<section className="col-span-full md:col-span-8">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Chatbots
				</h4>

				<div
					className={cn(
						'rounded-md grid grid-cols-2',
						layout == 'grid' ? 'gap-8' : 'gap-0'
					)}
				>
					{isLoading && (
						<Skeleton className="col-span-full h-96 bg-background" />
					)}
					{data &&
						data.map((chatbot) => (
							<Card
								className={cn(
									'rounded-none py-4 cursor-pointer',
									layout == 'grid'
										? 'col-span-1 min-h-36 rounded-md'
										: 'col-span-full first:rounded-t-md last:rounded-b-md'
								)}
								key={chatbot.id}
								onClick={() =>
									router.push(`/dashboard/${chatbot.id}/estadisticas`)
								}
							>
								<CardContent className="flex justify-between">
									<div className="flex items-center gap-x-4">
										<Avatar>
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-medium">{chatbot.name}</h4>
											<p className="text-sm font-medium text-muted-foreground">
												{chatbot.model}
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
											<DropdownMenuLabel>My Account</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>Profile</DropdownMenuItem>
											<DropdownMenuItem>Billing</DropdownMenuItem>
											<DropdownMenuItem>Team</DropdownMenuItem>
											<DropdownMenuItem>Subscription</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardContent>
							</Card>
						))}
				</div>
			</section>
			<section className="col-span-full md:col-span-4">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Uso
				</h4>
				<Card className="w-full rounded-md bg-card text-card-foreground">
					<CardHeader>
						<CardTitle>Last 30 days</CardTitle>
						<CardDescription>Updated 13m ago</CardDescription>
						<CardAction>
							<PayWithStripe className="text-sm" />
						</CardAction>
					</CardHeader>
					<CardContent>
						{usageMetrics.map((metric) => (
							<article
								className="hover:bg-accent transition-colors odd:bg-muted even:bg-card rounded-md py-1 px-2"
								key={metric.label}
							>
								<div className="flex justify-between text-sm items-center rounded-md">
									<div className="flex gap-x-2 items-center">
										<CircularProgressBar
											className="w-4 h-4"
											min={0}
											max={100}
											value={Math.random() * 10}
										/>
										<p className="font-semibold">{metric.label}</p>
									</div>
									<p className="font-mono text-muted-foreground text-xs">
										{metric.used} / {metric.limit}
									</p>
								</div>
							</article>
						))}
					</CardContent>
				</Card>
			</section>
		</div>
	)
}

export default DashboardOverview
