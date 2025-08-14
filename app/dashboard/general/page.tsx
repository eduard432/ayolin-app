'use client'

import { SearchBar } from '@/components/ui/SearchBar'
import {
	Card,
	CardContent,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { PayWithStripe } from '@/components/ui/StripeButton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Ellipsis, LayoutGrid, List, Plus } from 'lucide-react'
import { useState } from 'react'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useChatbots, useDeleteChatbot } from '@/data/chatbot/chatbot.client'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'
import { Chatbot } from '@prisma/client'
import Usage, { UsageSkeleton } from './Usage'

type LayoutType = 'grid' | 'list'

const ChatbotCard = ({
	layout,
	chatbot,
}: {
	layout: LayoutType
	chatbot: Chatbot
}) => {
	const router = useRouter()

	const deleteMutation = useDeleteChatbot(chatbot)

	return (
		<Card
			className={cn(
				'rounded-none py-4',
				layout == 'grid'
					? 'col-span-1 min-h-36 rounded-md'
					: 'col-span-full first:rounded-t-md last:rounded-b-md'
			)}
			key={chatbot.id}
		>
			<CardContent className="flex justify-between items-center">
				<div
					onClick={() => router.push(`/dashboard/${chatbot.id}/estadisticas`)}
					className="flex items-center gap-x-4 cursor-pointer"
				>
					<Avatar className="w-10 h-10 ring-1 ring-violet-500/20">
						<AvatarFallback
							className={cn(
								"w-full h-full flex items-center justify-center rounded-full bg-violet-500/10 text-violet-400"
							)}
							aria-label={chatbot.name}
						>
							<Bot className='h-5 w-5' />
						</AvatarFallback>		
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
						<DropdownMenuItem
							onClick={() => deleteMutation.mutate()}
							disabled={deleteMutation.isPending}
							className="text-destructive"
						>
							Eliminar
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push(`/dashboard/${chatbot.id}/editar`)}
						>
							Editar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardContent>
		</Card>
	)
}

const SkeletonCard = ({ layout }: { layout: LayoutType }) => {
	return (
		<Card
			className={cn(
				'rounded-none py-4',
				layout == 'grid'
					? 'col-span-1 min-h-36 rounded-md'
					: 'col-span-full first:rounded-t-md last:rounded-b-md'
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

const DashboardOverview = () => {
	const [layout, setLayout] = useState<LayoutType>('list')
	const { data: session } = useSession()

	const { data, isLoading } = useChatbots(session?.user?.id || '')
	const isMobile = useIsMobile()

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-8">
			<section className="flex items-center gap-x-4 col-span-full">
				<SearchBar className="h-full bg-background rounded-md" />
				{!isMobile && (
					<ToggleGroup
						value={layout}
						onValueChange={(value) => setLayout(value as LayoutType)}
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
				<Button size={isMobile ? 'icon' : 'default'} asChild>
					<Link href="/dashboard/nuevo">
						{isMobile ? <Plus /> : 'Add New'}
					</Link>
				</Button>
			</section>
			<section className="col-span-full md:col-span-8">
				<div className='flex grid-cols-2 gap-10'>
					<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
						Chatbots
					</h4>
					< PayWithStripe />
				</div>
				<div
					className={cn(
						'rounded-md grid grid-cols-2',
						layout == 'grid' ? 'gap-8' : 'gap-0'
					)}
				>
					{isLoading
						? Array.from({ length: 4 }).map((_, i) => (
								<SkeletonCard key={i} layout={layout} />
							))
						: data &&
							data.map((chatbot) => (
								<ChatbotCard
									key={chatbot.id}
									chatbot={chatbot}
									layout={layout}
								/>
							))}
					{!isLoading && data && data.length == 0 && (
						<Card className="col-span-full min-h-64 md:min-h-80 h-full">
							<CardContent className="flex flex-col gap-y-8 items-center justify-center h-full">
								<h4 className="text-xl font-semibold text-muted-foreground">
									¡Empieza a crear algo nuevo!
								</h4>
								<Button variant="outline" asChild>
									<Link href="/dashboard/nuevo">Agregar Nuevo</Link>
								</Button>
							</CardContent>
						</Card>
					)}
				</div>
			</section>
			<section className="col-span-full md:col-span-4">
				<h4 className="col-span-full scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Uso
				</h4>
				{ (session && data) ? <Usage chatbots={data.length} session={session} /> : (<UsageSkeleton />) }
			</section>
		</div>
	)
}

export default DashboardOverview
