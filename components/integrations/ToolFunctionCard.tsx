import { cn, fieldsToZod, toTitleCase } from '@/lib/utils'
import { Chatbot, ToolFunction } from '@prisma/client'
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
import { MarkdownRender } from '@/components/common/MarkdownRender'
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
import { IntegrationCard } from './IntegrationCard'

type ToolFunctionCardProps = {
	configUrl?: string
	chatbot: Chatbot
	toolFunction: ToolFunction
}
const InstallIntegration = ({
	toolFunction,
	chatbotId,
}: {
	toolFunction: ToolFunction
	chatbotId: string
}) => {
	const [showSettings, setShowSettings] = React.useState(false)

	const form = useForm({
		resolver: zodResolver(fieldsToZod(toolFunction.settingsSchema)),
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
		if (toolFunction.settingsSchema.length > 0 && !showSettings) {
			setShowSettings(true)
		} else {
			mutation.mutate({
				chatbotId,
				keyName: toolFunction.keyName,
				settings: { integration: toolFunction },
			})
		}
	}

	const onSubmit = (values: Record<string, string>) => {
		mutation.mutate({
			chatbotId,
			keyName: toolFunction.keyName,
			settings: { config: { ...values }, integration: toolFunction },
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
						{toolFunction.settingsSchema.map((integrationField) => (
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
					<MarkdownRender>{toolFunction.description}</MarkdownRender>
				</div>
				<Button className="w-full" onClick={handleInstall}>
					Instalar
				</Button>
			</>
		)
	}
}

export const ToolFunctionCard = ({
	chatbot,
	toolFunction,
}: ToolFunctionCardProps) => {
	const router = useRouter()

	const alredyInstall =
		chatbot &&
		chatbot.tools.some((tool) => tool.keyName === toolFunction.keyName)

	return (
		<IntegrationCard
			title={toolFunction.name}
			description={toolFunction.shortDesc}
			imageUrl={toolFunction.imageUrl}
		>
			<Dialog>
				<form className="absolute z-10 right-0 p-4">
					{alredyInstall ? (
						<Button
							onClick={() =>
								router.push(`/dashboard/${chatbot?.id}/integraciones`)
							}
							type="button"
							variant="outline"
						>
							Configurar
						</Button>
					) : (
						<DialogTrigger asChild>
							<Button variant="outline">Agregar</Button>
						</DialogTrigger>
					)}
					<DialogContent className={cn('sm:max-w-[425px]')}>
						<DialogHeader>
							<DialogTitle>{toolFunction.name}</DialogTitle>
							<DialogDescription>{toolFunction.shortDesc}</DialogDescription>
						</DialogHeader>

						<InstallIntegration
							toolFunction={toolFunction}
							chatbotId={chatbot.id}
						/>
					</DialogContent>
				</form>
			</Dialog>
		</IntegrationCard>
	)
}
