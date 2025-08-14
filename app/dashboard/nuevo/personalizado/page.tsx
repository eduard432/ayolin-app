'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
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
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createChatbot } from '@/data/chatbot/chatbot.client'
import { modelPrices } from '@/lib/constants/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chatbot } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string(),
	initialPrompt: z.string(),
	model: z.string(),
})

const Page = () => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		z.infer<typeof formSchema>,
		{ previousChatbots: Chatbot[] }
	>({
		mutationFn: async (data) => {
			const result = await createChatbot(data)
			return result
		},
		onError: (_, __, context) => {
			toast.error(`Error creating chatbot`)
			queryClient.setQueryData(['chatbots'], context?.previousChatbots)
		},
		onMutate: async (newChatbot) => {
			await queryClient.invalidateQueries({
				queryKey: ['user'],
			})
			await queryClient.cancelQueries({ queryKey: ['chatbots'] })

			// Snapshot de los datos anteriores
			const previousChatbots = queryClient.getQueryData([
				'chatbots',
			]) as Chatbot[]

			// Optimistic update
			queryClient.setQueryData(['chatbots'], (old: Chatbot[]) => [
				...(old || []),
				newChatbot,
			])

			return { previousChatbots }
		},
		onSuccess: () => {
			toast.success('Chatbot created successfully')
			router.push('/dashboard/general')
			form.reset()
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate(values)
	}

	return (
		<Card className="md:w-1/2 md:mx-auto">
			<CardHeader>
				<CardTitle className="text-xl">New Chatbot</CardTitle>
				<CardDescription>
					Crate a chatbot with your own custom settings
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormDescription>Chatbot public name</FormDescription>
									<FormControl>
										<Input placeholder="Chatcito" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Model</FormLabel>
									<FormDescription>AI model for chatbot</FormDescription>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(modelPrices).map(([id, model]) => (
												<SelectItem
													disabled={model.name !== 'gpt-5-nano'}
													key={id}
													value={id}
												>
													{model.name}{' '}
													<Badge className="bg-blue-600 text-neutral-50"  >
														{new Intl.NumberFormat('en-MX', {
															style: 'currency',
															currency: 'MXN',
															maximumFractionDigits: 4,
														}).format(model.input * 20)}
													</Badge>
													<Badge className="bg-teal-600 text-neutral-50"  >
														{new Intl.NumberFormat('en-MX', {
															style: 'currency',
															currency: 'MXN',
															maximumFractionDigits: 4,
														}).format(model.output * 20)}
													</Badge>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="initialPrompt"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Initial Prompt</FormLabel>
									<FormDescription>
										Prompt send to chatbot in all messages
									</FormDescription>
									<FormControl>
										<Textarea
											className="resize-none"
											placeholder="Prompt..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={mutation.isPending}
							type="submit"
							className="w-full mt-8 disabled:opacity-50"
						>
							Create
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default Page
