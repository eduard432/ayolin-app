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
import { Button } from '@/referencia/ui/button'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { CircularProgressBar } from '@/components/ui/circular-progress-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ChevronDown, Ellipsis, LayoutGrid, List } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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

const proyectos = [
	{
		nombre: 'repositorio-inclusion',
		url: 'https://repositorio-inclusion.vercel.app',
		descripcion: 'Update page.tsx',
		fecha: 'Mar 21',
		rama: 'master',
		repo: 'eduard432/repositorio-inclusion',
	},
	{
		nombre: 'nextjs-ai-chatbot',
		url: 'https://nextjs-ai-chatbot-lyart-six-41.vercel.app',
		descripcion: 'No Production Deployment',
		fecha: '22h ago',
		rama: 'master',
		repo: 'eduard432/nextjs-ai-chatbot',
	},
	{
		nombre: 'nextjs-dashboard-tutorial',
		url: 'https://nextjs-dashboard-tutorial-two-ze.vercel.app',
		descripcion: 'Initial app',
		fecha: '3/28/24',
		rama: 'master',
		repo: 'eduard432/nextjs-dashboard-tutorial',
	},
	{
		nombre: 'dictado-greco',
		url: 'https://dictado-greco.vercel.app',
		descripcion: 'Bug Fix - solved the min-max error. Added Favicon',
		fecha: '3/6/23',
		rama: 'master',
		repo: 'eduard432/dictado-greco',
	},
	{
		nombre: 'fireship-server-actions',
		url: 'https://fireship-server-actions.vercel.app',
		descripcion: 'Connect Git Repository',
		fecha: 'Jun 6',
		rama: null,
		repo: null,
	},
	{
		nombre: 'next-commerce-shopify',
		url: 'https://next-commerce-shopify-nine.vercel.app',
		descripcion: 'Initial commit',
		fecha: '5/31/22',
		rama: 'master',
		repo: 'eduard432/next-commerce-shopify',
	},
]

const DashboardOverview = () => {
	const [layout, setLayout] = useState<'grid' | 'list'>('list')

	return (
		// TODO: mover este padding al layout
			<div className=" grid grid-cols-12 gap-x-8 gap-y-4 pt-8 px-10">
				<section className="flex items-center gap-x-4 col-span-12">
					<SearchBar className="h-full bg-white rounded-md" />
					<ToggleGroup
						value={layout}
						onValueChange={(value) => setLayout(value as 'grid' | 'list')}
						type="single"
						className="border h-full bg-white"
					>
						<ToggleGroupItem
							value="grid"
							aria-label="Toggle grid"
							className="rounded-md m-1 p-4 w-2 h-2 cursor-pointer"
						>
							<LayoutGrid className="" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="list"
							aria-label="Toggle list"
							className="rounded-md m-1 p-4 w-2 h-2 cursor-pointer"
						>
							<List className="" />
						</ToggleGroupItem>
					</ToggleGroup>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-full cursor-pointer">
								Add New... <ChevronDown />
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
				</section>
				<section className="col-span-4">
					<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
						Usage
					</h4>
					<Card className="w-full rounded-md">
						<CardHeader>
							<CardTitle>Last 30 days</CardTitle>
							<CardDescription>Updated 13m ago</CardDescription>
							<CardAction>
								<Button size="sm">Upgrade</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<Table>
								<TableBody className="divide-none">
									{usageMetrics.map((metric) => (
										<TableRow
											className="odd:bg-neutral-50 hover:bg-neutral-200"
											key={metric.label}
										>
											<TableCell className="flex justify-between text-sm">
												<div className="flex gap-x-2">
													<CircularProgressBar
														className="w-6 h-6"
														min={0}
														max={100}
														value={Math.random() * 10}
													/>
													<p className="">{metric.label}</p>
												</div>
												<p className="font-mono text-neutral-500 text-xs">
													{metric.used} / {metric.limit}
												</p>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</section>

				<section className="col-span-8">
					<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
						Projects
					</h4>

					<div
						className={cn(
							'rounded-md grid grid-cols-2',
							layout == 'grid' ? 'gap-8' : 'gap-0'
						)}
					>
						{proyectos.map((proyecto) => (
							<Card
								className={cn(
									'rounded-none py-4',
									layout == 'grid'
										? 'col-span-1 min-h-36 rounded-md'
										: 'col-span-2'
								)}
								key={proyecto.nombre}
							>
								<CardContent className="flex justify-between">
									<div className="flex items-center gap-x-4">
										<Avatar>
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-medium">{proyecto.nombre}</h4>
											<p className="text-sm font-medium text-neutral-500">
												{proyecto.descripcion}
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
			</div>
	)
}

export default DashboardOverview
