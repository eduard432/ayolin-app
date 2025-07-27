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
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { updateChatbot, useChatbot } from '@/data/chatbot.client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chatbot } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string(),
	initialPrompt: z.string(),
	model: z.string(),
})

const EditPage = () => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			initialPrompt: '',
			model: '',
		},
	})

	const setInitialValues = useCallback(() => {
		if (chatbot) {
			form.reset({
				name: chatbot.name,
				initialPrompt: chatbot.initialPrompt,
				model: chatbot.model,
			})
		}
	}, [chatbot, form]) // dependencias correctas

	useEffect(() => {
		setInitialValues()
	}, [setInitialValues])

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
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (chatbot) {
			mutation.mutate({ data: values, chatbotId: chatbot.id })
		}
	}

	return (
		<>
			{chatbot && (
				<Card className="md:w-1/2 md:mx-auto">
					<CardHeader>
						<CardTitle className="text-xl">Editar {chatbot.name}</CardTitle>
						<CardDescription>
							Crate a chatbot with your own custom settings
						</CardDescription>
						<CardAction>
							<Button onClick={() => setInitialValues()} size="sm">
								Reset
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
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
								<Button disabled={!form.formState.isDirty || mutation.isPending} type="submit" className="w-full">
									Editar
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			)}
		</>
	)
}

export default EditPage
