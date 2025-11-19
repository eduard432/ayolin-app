'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Chatbot } from '@prisma/client'
import { createChannel } from '@/data/integrations/integrations.client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { IntegrationCard } from '../integrations/IntegrationCard'

const telegramSchema = z.object({
	token: z.string().min(1, 'Token requerido'),
})

export const TelegramIntegrationCard = ({
	chatbotId,
	imageUrl,
}: {
	chatbotId: string
	imageUrl: string
}) => {
	const form = useForm<z.infer<typeof telegramSchema>>({
		resolver: zodResolver(telegramSchema),
		defaultValues: { token: '' },
	})

	const queryClient = useQueryClient()
	const router = useRouter()

	const mutation = useMutation<
		Chatbot,
		Error,
		z.infer<typeof telegramSchema>,
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async (data) => {
			const result = await createChannel({
				settings: { token: data.token },
				chatbotId,
				keyName: 'telegram',
			})
			return result
		},
		onError: (_, __, context) => {
			toast.error('Error agregando Telegram')
			queryClient.setQueryData(
				['chatbot', chatbotId],
				context?.previousChatbot
			)
		},
		onMutate: async (newData) => {
			await queryClient.cancelQueries({ queryKey: ['chatbot', chatbotId] })
			const previousChatbot = queryClient.getQueryData<Chatbot>([
				'chatbot',
				chatbotId,
			]) as Chatbot

			queryClient.setQueryData(['chatbot', chatbotId], (old: Chatbot) => {
				if (!old) return old
				return {
					...old,
					channels: [
						...old.channels,
						{
							keyName: 'telegram',
							settings: { token: newData.token },
						},
					],
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Telegram instalado con éxito')
			router.push(`/dashboard/${chatbotId}/integraciones`)
			form.reset()
		},
	})

	const onSubmit = (values: z.infer<typeof telegramSchema>) => {
		mutation.mutate(values)
	}

	return (
		<IntegrationCard
			title="Telegram"
			imageUrl={imageUrl}
			description="Integra tu chatbot con Telegram y empieza a responder desde un canal."
		>
			<Dialog>
				<Form {...form}>
					<form
						className="space-y-6 absolute z-10 right-0 p-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<DialogTrigger asChild>
							<Button variant="outline">Agregar</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Telegram</DialogTitle>
								<DialogDescription>
									Configura la integración de Telegram con tu chatbot
								</DialogDescription>
							</DialogHeader>

							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<FormDescription>
											Introduce el token del bot de Telegram
										</FormDescription>
										<FormControl>
											<Input placeholder="token" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Instalar canal
							</Button>
						</DialogContent>
					</form>
				</Form>
			</Dialog>
		</IntegrationCard>
	)
}
