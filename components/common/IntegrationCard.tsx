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
import { MarkdownRender } from './MarkdownRender'

// Componente base reutilizable
const IntegrationContent = ({
	integration,
	onInstall,
}: {
	integration: ToolFunction | Channel
	onInstall?: () => void
}) => {
	const [showSettings, setShowSettings] = React.useState(false)

	const handleInstall = () => {
		console.log('exec')
		console.log(integration)
		if(integration.settingsSchema.length > 0) {
			console.log('exec 2')
			setShowSettings(true)
		}
	}

	if (showSettings) {
		return (
			<>
				<div className="space-y-2 mb-4">
					<h3 className="text-xl font-semibold">Configuración</h3>
					<p className="text-muted-foreground">{integration.shortDesc}</p>
				</div>
				<div className="my-4">
					Config
				</div>
				<Button className="w-full" onClick={onInstall}>
					Instalar
				</Button>
				<Button onClick={() => setShowSettings(false)} className="w-full"  variant="link" size="sm" >
					Volver
				</Button>
			</>
		)
	}

	if (!showSettings) {
		return (
			<>
				<div className="space-y-2 mb-4">
					<h3 className="text-xl font-semibold">{integration.name}</h3>
					<p className="text-muted-foreground">{integration.shortDesc}</p>
				</div>
				<div className="bg-accent p-4 rounded-md text-sm mb-4">
					<MarkdownRender>{integration.description}</MarkdownRender>
				</div>
				<Button className="w-full" onClick={handleInstall}>
					Instalar
				</Button>
			</>
		)
	}
}

// Versión Card
export const InstallIntegrationCard = ({
	integration,
	className,
	onInstall,
}: {
	integration: ToolFunction | Channel
	className?: string
	onInstall?: () => void
}) => {
	return (
		<Card className={className}>
			<CardContent>
				<IntegrationContent integration={integration} onInstall={onInstall} />
			</CardContent>
		</Card>
	)
}

// Versión Dialog
export const InstallIntegrationDialog = ({
	integration,
	className,
	onInstall,
}: {
	integration: ToolFunction | Channel
	className?: string
	onInstall?: () => void
}) => {
	return (
		<DialogContent className={cn('sm:max-w-[425px]', className)}>
			<DialogHeader>
				<DialogTitle>{integration.name}</DialogTitle>
				<DialogDescription>{integration.shortDesc}</DialogDescription>
			</DialogHeader>
			<div className="bg-accent p-4 rounded-md text-sm">
				<MarkdownRender>{integration.description}</MarkdownRender>
			</div>
			<DialogFooter>
				<Button className="w-full" type="submit" onClick={onInstall}>
					Instalar
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}

// Alternativa: Componente completamente unificado con prop variant
export const InstallIntegration = ({
	integration,
	variant = 'card',
	className,
	onInstall,
}: {
	integration: ToolFunction | Channel
	variant?: 'card' | 'dialog'
	className?: string
	onInstall?: () => void
}) => {
	const content = (
		<IntegrationContent integration={integration} onInstall={onInstall} />
	)

	if (variant === 'dialog') {
		return (
			<DialogContent className={cn('sm:max-w-[425px]', className)}>
				<DialogHeader>
					<DialogTitle>{integration.name}</DialogTitle>
					<DialogDescription>{integration.shortDesc}</DialogDescription>
				</DialogHeader>
				<div className="bg-accent p-4 rounded-md text-sm">
					<MarkdownRender>{integration.description}</MarkdownRender>
				</div>
				<DialogFooter>
					<Button className="w-full" type="submit" onClick={onInstall}>
						Instalar
					</Button>
				</DialogFooter>
			</DialogContent>
		)
	}

	return (
		<Card className={className}>
			<CardContent className="">{content}</CardContent>
		</Card>
	)
}

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
	className,
}: {
	integration: ToolFunction | Channel
	className?: string
}) => {
	return (
		<Card className={cn('pt-0 justify-start relative', className)}>
			<CardHeader className="absolute right-20 top-4 z-10">
				<CardAction>
					<Dialog>
						<form>
							<DialogTrigger asChild>
								<Button variant="outline">Agregar</Button>
							</DialogTrigger>
							<InstallIntegration integration={integration} variant="dialog" />
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
			<AspectRatio ratio={16 / 9}>
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
					{integration.shortDesc}
				</p>
			</CardContent>
		</Card>
	)
}
