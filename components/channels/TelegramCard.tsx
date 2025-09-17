'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card'
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
import Image from 'next/image'

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
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<CardAction>
					<Dialog>
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

							<Form {...form}>
								<form
									className="space-y-6"
									onSubmit={form.handleSubmit(onSubmit)}
								>
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
								</form>
							</Form>
						</DialogContent>
					</Dialog>
				</CardAction>
			</CardHeader>

			<AspectRatio ratio={16 / 9}>
				<Image
					src={imageUrl}
					alt="Telegram Integration"
					fill
					className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
				/>
			</AspectRatio>
			<CardContent>
                <p className="font-semibold">Telegram</p>
				<p className="text-sm text-neutral-600 truncate">
					Integra tu chatbot con Telegram y empieza a responder desde un canal.
				</p>
			</CardContent>
		</Card>
	)
}