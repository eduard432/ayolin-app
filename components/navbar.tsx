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
import { BookOpen, Search } from 'lucide-react'
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
import { getAllowedNavbarRoutes } from '@/lib/navbarData'
import { useIsMobile } from '@/hooks/use-mobile'
import { GeneratedAvatar } from 'components/generateAvatar'

const Title = () => {
	return (
		<h1 className="uppercase tracking-widest font-semibold text-foreground text-2xl">
			Ayolin
		</h1>
	)
}

export default function Navbar() {
	const { data: session } = useSession()
	const pathname = usePathname()
	const params = useParams()
	const chatbotId = params.chatbotId as string | undefined
	const router = useRouter()

	const allowedNavbarRoutes = getAllowedNavbarRoutes(chatbotId)
	const showNavbar = allowedNavbarRoutes.includes(pathname)

	const isMobile = useIsMobile()

	return (
		<nav
			className={cn(
				'pt-8 pb-2 px-8 items-center flex justify-between bg-background text-foreground',
				!showNavbar && 'bg-transparent'
			)}
		>
			{isMobile ? (
				<Title />
			) : (
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard/general">
								<Title />
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="opacity-65">/</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink className="text-foreground" href="/">
								Home
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			)}
			<div className="flex items-center gap-x-2">
				{isMobile ? (
					<Button size="sm" variant="outline" className="rounded-full">
						<Search />
					</Button>
				) : (
					<SearchBar className="h-8" placeholder="Find..." />
				)}

				<Button size="sm" variant="outline" className="rounded-full">
					<BookOpen />
				</Button>
				<DropdownMenu>
					
					<DropdownMenuTrigger asChild>
						<div className='cursor-pointer'>
							<GeneratedAvatar
								name={session?.user?.name || session?.user?.email || "U"}
								size='w-10 h-10'
							/> 
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => signOut()}
							className="cursor-pointer"
						>
							Sign Out
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push('/dashboard/configuracion/cuenta')}
						>
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
