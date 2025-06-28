'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string(),
	initialPrompt: z.string(),
	model: z.string(),
})

const Page = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<Card className="w-1/2 mx-auto">
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
											<SelectTrigger className="w-full" >
												<SelectValue placeholder="Select a model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="openai-gpt3.5">
												Open AI gpt-3.5
											</SelectItem>
											<SelectItem value="openai-gpt4">
												Open AI gpt-4
											</SelectItem>
											<SelectItem value="openai-gpt4-turbo">
												Open AI gpt-4-turbo
											</SelectItem>
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
						<Button type="submit" className="w-full mt-8">
							Create
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default Page
