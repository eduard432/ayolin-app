'use client'

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
import { useForm } from 'react-hook-form'
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

const formSchema = z.object({
	name: z.string(),
	description: z.string(),
	apiUrl: z.string(),
	httpMethod: z.enum(['get', 'post', 'put', 'delete']),
	inputSchema: fieldSchema.array().optional(),
	isBodyParams: z.boolean(),
})

const CustomToolPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			httpMethod: 'get',
		},
	})


	useEffect(() => {
		const subscription = form.watch((value) => {
			if (value.httpMethod === 'get') {
        form.setValue('isBodyParams', false)
			}
		})

		return () => subscription.unsubscribe()
	}, [form])

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
					<form action="space-y-4">
						<section className="space-y-4">
							<Separator />
							<h3 className="text-current font-semibold text-xl">
								Información General
							</h3>
							<div className="space-y-4">
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

								<Separator />
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

								<Separator />
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
										<FormItem className="flex gap-x-4 justify-items-center" >
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
							</div>
						</section>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default CustomToolPage
