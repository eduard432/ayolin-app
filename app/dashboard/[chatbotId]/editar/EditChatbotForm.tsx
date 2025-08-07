'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { updateChatbot } from '@/data/chatbot.client'
import { modelPrices } from '@/lib/constants/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chatbot } from '@prisma/client'
import { SelectContent } from '@radix-ui/react-select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string(),
	initialPrompt: z.string(),
	model: z.string(),
})

const EditChatbotForm = ({ chatbot }: { chatbot: Chatbot }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: chatbot.name,
			initialPrompt: chatbot.initialPrompt,
			model: chatbot.model,
		},
	})

	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		{
			chatbotId: string
			data: z.infer<typeof formSchema>
		},
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async (data) => {
			const result = await updateChatbot(data.chatbotId, data.data)
			return result
		},
		onError: (_, data, context) => {
			toast.error('Error updating chatbot')
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
					...data.data,
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Chatbot updated successfully')
			const currentValues = form.getValues()
			form.reset(currentValues)
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (chatbot) {
			mutation.mutate({ data: values, chatbotId: chatbot.id })
		}
	}

	return (
		<Card className="md:w-1/2 md:mx-auto">
			<CardHeader>
				<CardTitle className="text-xl">Editar {chatbot.name}</CardTitle>
				<CardDescription>
					Crate a chatbot with your own custom settings
				</CardDescription>
				<CardAction>
					<Button
						disabled={!form.formState.isDirty}
						onClick={() => form.reset()}
						size="sm"
					>
						Reset
					</Button>
				</CardAction>
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
										value={field.value}
										disabled
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(modelPrices).map(([id, model]) => (
												<SelectItem
													disabled={model.name !== 'gpt-4.1-nano'}
													key={id}
													value={id}
												>
													{model.name}
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
							disabled={!form.formState.isDirty || mutation.isPending}
							type="submit"
							className="w-full"
						>
							Editar
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default EditChatbotForm
