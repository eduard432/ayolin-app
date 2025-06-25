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

export default function Navbar() {
	return (
		<nav className="bg-white px-10 py-4 items-center flex justify-between">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard/overview">
							<p className="uppercase tracking-widest font-semibold">Ayolin</p>
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
