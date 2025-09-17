'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { cn, fieldsToZod, toTitleCase } from '@/lib/utils'
import { Channel, Chatbot, ToolFunction } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { MarkdownRender } from './MarkdownRender'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	addTool,
	AddToolDataType,
} from '@/data/integrations/integrations.client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Componente base reutilizable
const IntegrationContent = ({
	integration,
	chatbotId,
}: {
	integration: ToolFunction | Channel
	chatbotId: string
}) => {
	const [showSettings, setShowSettings] = React.useState(false)

	const form = useForm({
		resolver: zodResolver(fieldsToZod(integration.settingsSchema)),
	})

	const queryClient = useQueryClient()
	const router = useRouter()

	const mutation = useMutation<
		Chatbot,
		Error,
		AddToolDataType,
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async (data) => {
			const result = await addTool({
				chatbotId: data.chatbotId,
				keyName: data.keyName,
				settings: data.settings,
			})
			return result.chatbot
		},
		onError: (_, data, context) => {
			toast.error('Error adding tool')
			queryClient.setQueryData(
				['chatbot', data.chatbotId],
				context?.previousChatbot
			)
		},
		onMutate: async (data) => {
			await queryClient.cancelQueries({
				queryKey: ['chatbot', data.chatbotId],
			})

			const previousChatbot = queryClient.getQueryData<Chatbot>([
				'chatbot',
				data.chatbotId,
			]) as Chatbot

			queryClient.setQueryData(['chatbot', data.chatbotId], (old: Chatbot) => {
				if (!old) return old
				return {
					...old,
					tools: [...old.tools, { keyName: data.keyName }],
				}
			})

			return { previousChatbot }
		},
		onSuccess: (chatbot) => {
			toast.success('Tool added successfully')
			router.push(`/dashboard/${chatbot.id}/integraciones`)
		},
	})

	const handleInstall = () => {
		// Validate if exists config
		if (integration.settingsSchema.length > 0 && !showSettings) {
			setShowSettings(true)
		} else {
			mutation.mutate({
				chatbotId,
				keyName: integration.keyName,
				settings: { integration },
			})
		}
	}

	const onSubmit = (values: Record<string, string>) => {
		mutation.mutate({
			chatbotId,
			keyName: integration.keyName,
			settings: { config: {...values}, integration },
		})
	}

	if (showSettings) {
		return (
			<>
				<Form {...form}>
					<form
						id="settings-form"
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{integration.settingsSchema.map((integrationField) => (
							<FormField
								key={integrationField.name}
								control={form.control}
								name={integrationField.name}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="capitalize">
											{toTitleCase(integrationField.name)}
										</FormLabel>
										<FormControl>
											{(() => {
												switch (integrationField.type) {
													case 'string':
														return <Input type="text" {...field} />
													case 'number':
														return <Input type="number" {...field} />
													case 'boolean':
														return (
															<Checkbox
																checked={field.value || false}
																onCheckedChange={(checked) => {
																	field.onChange(checked)
																}}
															/>
														)
													default:
														return null
												}
											})()}
										</FormControl>
										<FormDescription>
											{integrationField.description}
										</FormDescription>
									</FormItem>
								)}
							/>
						))}
					</form>
				</Form>
				<Button className="w-full" form="settings-form" type="submit">
					Instalar
				</Button>
				<Button
					onClick={() => setShowSettings(false)}
					className="w-full"
					variant="link"
					size="sm"
				>
					Volver
				</Button>
			</>
		)
	}

	if (!showSettings) {
		return (
			<>
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

// Alternativa: Componente completamente unificado con prop variant
export const InstallIntegration = ({
	integration,
	variant = 'card',
	className,
	chatbotId,
}: {
	integration: ToolFunction | Channel
	variant?: 'card' | 'dialog'
	className?: string
	chatbotId: string
}) => {
	const content = (
		<IntegrationContent chatbotId={chatbotId} integration={integration} />
	)

	if (variant === 'dialog') {
		return (
			<>
				<DialogContent className={cn('sm:max-w-[425px]', className)}>
					<DialogHeader>
						<DialogTitle>{integration.name}</DialogTitle>
						<DialogDescription>{integration.shortDesc}</DialogDescription>
					</DialogHeader>
					{content}
				</DialogContent>
			</>
		)
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{integration.name}</CardTitle>
				<CardDescription>{integration.shortDesc}</CardDescription>
			</CardHeader>
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
	chatbotId,
	chatbot,
}: {
	integration: ToolFunction | Channel
	className?: string
	chatbotId: string
	chatbot?: Chatbot
}) => {
	const router = useRouter()

	const alredyInstall =
		chatbot &&
		chatbot.tools.some((tool) => tool.keyName === integration.keyName)

	return (
		<Card className={cn('pt-0 justify-start relative', className)}>
			<CardHeader
				className={cn(
					'absolute top-4 z-10',
					alredyInstall ? 'right-24' : 'right-20'
				)}
			>
				<CardAction>
					<Dialog>
						<form>
							{alredyInstall ? (
								<Button
									type="button"
									variant="outline"
									className=""
									onClick={() =>
										router.push(`/dashboard/${chatbot.id}/integraciones`)
									}
								>
									Configurar
								</Button>
							) : (
								<DialogTrigger asChild>
									<Button variant="outline">Agregar</Button>
								</DialogTrigger>
							)}
							<InstallIntegration
								chatbotId={chatbotId}
								integration={integration}
								variant="dialog"
							/>
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
