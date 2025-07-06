/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { useSession } from 'next-auth/react'
import { SearchBar } from './search-bar'
import { Button } from './ui/button'
import { Bell, BookOpen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { dashboardFeatures, getChatbotFeatures, allowedNavbarRoutes } from '@/lib/navbarData'

export default function Navbar() {
	const { data: session } = useSession();
	const pathname = usePathname()
	const params = useParams()
	const chatbotId = params.chatbotId as string | undefined
	const router = useRouter()

	const features = chatbotId
			? getChatbotFeatures(chatbotId)
			: dashboardFeatures

	const showNavbar = allowedNavbarRoutes.includes(pathname)

	return (
		<nav className={cn("pt-8 pb-2 px-8 items-center flex justify-between bg-background text-foreground", !showNavbar && "bg-transparent")}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard/general">
							<h2 className="uppercase tracking-widest font-semibold text-foreground text-2xl">Ayolin</h2>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="opacity-65">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink className='text-foreground' href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex items-center gap-x-2">
				<SearchBar className="h-8" placeholder="Find..." />
				<Button size="sm" variant="outline" className="rounded-full">
					<Bell />
				</Button>
				<Button size="sm" variant="outline" className="rounded-full">
					<BookOpen />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer" >
							<AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"}/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()} className="cursor-pointer" >
							Sign Out
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => router.push("/dashboard/configuracion/cuenta")}>
							Cuenta
						</DropdownMenuItem>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}
