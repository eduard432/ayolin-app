'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { Channel, Chatbot, ToolFunction } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'


export const IntegrationCardSkeleton = () => {
	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<Skeleton className="h-9 w-20" />
			</CardHeader>

			<AspectRatio
				ratio={16 / 9}
				className={cn('bg-muted rounded-lg rounded-b-none')}
			>
				<Skeleton className="h-full w-full rounded-lg rounded-b-none" />
			</AspectRatio>

			<CardContent>
				<Skeleton className="h-5 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full" />
			</CardContent>
		</Card>
	)
}

export const IntegrationCard = ({
	integration,
}: {
	integration: ToolFunction | Channel
	chatbot: Chatbot
}) => {

	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<CardAction>
					<Dialog>
						<form>
							<DialogTrigger asChild>
								<Button variant="outline">Agregar</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click save when
										you&apos;re done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4">
									<div className="grid gap-3">
										<Label htmlFor="name-1">Name</Label>
										<Input
											id="name-1"
											name="name"
											defaultValue="Pedro Duarte"
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="username-1">Username</Label>
										<Input
											id="username-1"
											name="username"
											defaultValue="@peduarte"
										/>
									</div>
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</DialogContent>
						</form>
					</Dialog>
					{/* {!channels.includes(integration.keyName) ? (
						<InstallToolButton
							variant="outline"
							className="cursor-pointer"
							chatbot={chatbot}
							keyName={integration.keyName}
						/>
					) : (
						<InstallChannelButton
							chatbotId={chatbot.id}
							keyName={integration.keyName}
							variant="outline"
							className="cursor-pointer"
						/>
					)} */}
				</CardAction>
			</CardHeader>
			<AspectRatio
				ratio={16 / 9}
			>
				<Image
					src={integration.imageUrl}
					alt={`Tool Function image for ${integration.name}`}
					fill
					className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
				/>
			</AspectRatio>
			<CardContent>
				<p className="font-semibold">{integration.name}</p>
				<p className="text-sm text-neutral-600 truncate">
					{integration.blogDescription}
				</p>
			</CardContent>
		</Card>
	)
}
