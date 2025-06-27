// components/Navbar.tsx
'use client'

import React from 'react'
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbLink,
} from '@/components/ui/breadcrumb'
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
import { usePathname } from 'next/navigation'

export default function Navbar() {

	const pathname = usePathname() 

	return (
		<nav className={cn("pt-8 pb-2 px-8 items-center flex justify-between", pathname.includes("nuevo") ? "bg-none" : "bg-white")}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard/general">
							<h2 className="uppercase tracking-widest font-semibold text-neutral-800 text-2xl">Ayolin</h2>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="opacity-65">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
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
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()} className="cursor-pointer" >
							Sign Out
						</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}
