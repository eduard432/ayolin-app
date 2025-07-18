'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { createChannel } from '@/data/integrations.client'
import { Chatbot } from '@prisma/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const telegramSchema = z.object({
	token: z.string().min(1, 'Token requerido'),
})

export const TelegramConfigPage = ({ chatbotId  }: {chatbotId:string}) => {
	const form = useForm<z.infer<typeof telegramSchema>>({
		resolver: zodResolver(telegramSchema),
		defaultValues: {
			token: '',
		},
	})

	const router = useRouter()

	const mutation = useMutation<Chatbot, Error, z.infer<typeof telegramSchema>>(
		{
			mutationFn: async (data) => {
				const result = await createChannel({...data, chatbotId, keyName: 'telegram'})
				return result
			},
			onError: () => {
				toast.error(`Error adding chatbot`)
			},
			onSuccess: () => {
				toast.success('Telegram channel added successfully')
				router.push('/dashboard/general')
				form.reset()
			},
		}
	)

	const onSubmit = (values: z.infer<typeof telegramSchema>) => {
		mutation.mutate(values)
	}

	return (
		<div className="mx-auto w-1/2">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">
						Telegram Integration Configuration
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token</FormLabel>
										<FormDescription>
											Nombre de la tool function
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
				</CardContent>
			</Card>
		</div>
	)
}
