import React, { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { cn, fieldSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { InputSchema } from '@/components/InputSchema'
import { color } from 'framer-motion'
import { Switch } from '@/components/ui/switch'
import { is } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Chatbot } from '@prisma/client'
import { addTool } from '@/data/integrations.client'
import { ObjectId } from 'bson'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomFetchToolSettingsSchema } from '@/schemas'

export const CustomToolFormSkeleton = () => {
	return (
		<Card className="mx-auto w-full md:w-1/2">
			<CardHeader>
				<CardTitle className="text-2xl">
					<Skeleton className="h-6 w-2/3" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="h-4 w-full max-w-[300px]" />
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<section className="space-y-4">
					<Skeleton className="h-6 w-1/3" />

					{/* Nombre */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-full max-w-[300px]" />
						<Skeleton className="h-10 w-full" />
					</div>

					{/* Descripción */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-full max-w-[350px]" />
						<Skeleton className="h-24 w-full" />
					</div>
				</section>

				<Separator className="my-4" />

				{/* Input Schema */}
				<section className="space-y-2">
					<Skeleton className="h-4 w-1/4" />
					<Skeleton className="h-4 w-full max-w-[300px]" />
					<Skeleton className="h-10 w-full" />
				</section>

				<Separator className="my-4" />

				{/* API URL y Método */}
				<section className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-full max-w-[300px]" />
						<div className="flex gap-x-2">
							<Skeleton className="h-10 w-[120px]" />
							<Skeleton className="h-10 w-full" />
						</div>
					</div>

					{/* Switch Body Params */}
					<div className="flex items-center gap-x-4">
						<Skeleton className="h-6 w-12 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>
				</section>
			</CardContent>

			<CardFooter>
				<Skeleton className="h-10 w-full" />
			</CardFooter>
		</Card>
	)
}

const CustomToolForm = ({ chatbot }: { chatbot: Chatbot }) => {
	const router = useRouter()

	const form = useForm<z.infer<typeof CustomFetchToolSettingsSchema>>({
		resolver: zodResolver(CustomFetchToolSettingsSchema),
		defaultValues: {
			name: '',
			description: '',
			apiUrl: '',
			httpMethod: 'get',
			isBodyParams: false,
			inputSchema: [],
		},
	})

	const httpMethod = useWatch({
		control: form.control,
		name: 'httpMethod',
	})

	useEffect(() => {
		if (httpMethod === 'get') {
			form.setValue('isBodyParams', false)
		}
	}, [httpMethod])

	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		{
			keyName: string
			settings: z.infer<typeof CustomFetchToolSettingsSchema>
		},
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async ({ keyName, settings }) => {
			const result = await addTool({
				chatbotId: chatbot.id,
				keyName,
				settings,
			})
			return result.chatbot
		},
		onError: (_, __, context) => {
			toast.error('Error adding tool')
			queryClient.setQueryData(
				['chatbot', chatbot.id],
				context?.previousChatbot
			)
		},
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey: ['chatbot', chatbot.id] })

			const previousChatbot = queryClient.getQueryData<Chatbot>([
				'chatbot',
				chatbot.id,
			]) as Chatbot

			queryClient.setQueryData(['chatbot', chatbot.id], (old: Chatbot) => {
				if (!old) return old
				return {
					...old,
					tools: [...old.tools, { keyName: data.keyName }],
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Tool added successfully')
			router.push(`/dashboard/${chatbot.id}/integraciones`)
		},
	})

	const handleSubmit = (
		values: z.infer<typeof CustomFetchToolSettingsSchema>
	) => {
		mutation.mutate({
			keyName: `custom_fetch:${new ObjectId().toString()}`,
			settings: values,
		})
	}

	return (
		<Card className="mx-auto w-full md:w-1/2">
			<CardHeader>
				<CardTitle className="text-2xl">
					Crear nueva función personalizada
				</CardTitle>
				<CardDescription>
					Formulario para crear nueva tool function para el marketplace
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form className="space-y-4" onSubmit={() => {}}>
						<section className="space-y-4">
							<h3 className="text-current font-semibold text-xl">
								Información General
							</h3>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormDescription>
											Nombre de la custom tool function
										</FormDescription>
										<FormControl>
											<Input placeholder="Poke API" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción para IA</FormLabel>
										<FormDescription>
											Descripción de la función para que la IA entienda su
											propósito
										</FormDescription>
										<FormControl>
											<Textarea className="resize-none" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</section>
						<Separator className="my-4" />
						<section className="space-y-4">
							<FormField
								control={form.control}
								name="inputSchema"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Input Schema</FormLabel>
										<FormDescription>
											Input Schema de los parametros que pasa la AI
										</FormDescription>
										<FormControl>
											<InputSchema {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</section>
						<Separator className="my-4" />
						<section className="space-y-4">
							<FormItem>
								<FormLabel>API URL</FormLabel>
								<FormDescription>
									URL donde se ejecutará la función
								</FormDescription>
								<FormControl>
									<div className="flex gap-x-2">
										<FormField
											control={form.control}
											name="httpMethod"
											render={({ field }) => {
												const colorMap = {
													get: 'text-emerald-600',
													post: 'text-amber-500',
													put: 'text-blue-600',
													delete: 'text-red-600',
												}
												return (
													<Select
														defaultValue={field.value}
														onValueChange={field.onChange}
													>
														<SelectTrigger
															className={cn(
																'font-semibold w-[120px]',
																colorMap[field.value]
															)}
														>
															<SelectValue placeholder="HTTP METHOD" />
														</SelectTrigger>
														<SelectContent className="font-semibold">
															<SelectItem
																className={cn(colorMap['get'])}
																value="get"
															>
																GET
															</SelectItem>
															<SelectItem
																className={cn(colorMap['post'])}
																value="post"
															>
																POST
															</SelectItem>
															<SelectItem
																className={cn(colorMap['put'])}
																value="put"
															>
																PUT
															</SelectItem>
															<SelectItem
																className={cn(colorMap['delete'])}
																value="delete"
															>
																DELETE
															</SelectItem>
														</SelectContent>
													</Select>
												)
											}}
										/>

										<FormField
											control={form.control}
											name="apiUrl"
											render={({ field }) => (
												<Input
													placeholder="https://localhost:4000/api/v1/poke-api"
													{...field}
												/>
											)}
										/>
									</div>
								</FormControl>
							</FormItem>

							<FormField
								control={form.control}
								name="isBodyParams"
								render={({ field }) => (
									<FormItem className="flex gap-x-4 justify-items-center">
										<FormControl>
											<Switch
												disabled={form.watch('httpMethod') === 'get'}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<Label>Usar Body Params</Label>
									</FormItem>
								)}
							/>
						</section>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<Button onClick={form.handleSubmit(handleSubmit)} className="w-full">
					Agregar
				</Button>
			</CardFooter>
		</Card>
	)
}

export default CustomToolForm
