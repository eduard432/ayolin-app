'use client'

import { Button } from '@/components/ui/button'
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
import { InputSchema } from '@/components/fields/InputSchema'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { fieldSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputUrl } from '@/components/fields/InputUrl'
import {
	InstallIntegration,
	IntegrationCard,
} from '@/components/common/IntegrationCard'
import { UrlValueSchema } from '@/schemas'
import { useMutation } from '@tanstack/react-query'
import { createTool } from '@/data/admin/admin.tools.client'
import { ToolFunction } from '@prisma/client'
import { toast } from 'sonner'

const formSchema = z.object({
	name: z.string(),
	shortDesc: z.string(),
	description: z.string(),
	aiDesc: z.string(),
	settingsSchema: fieldSchema.array().optional(),
	inputSchema: fieldSchema.array().optional(),
	endpoint: UrlValueSchema,
	imageUrl: z.string(),
})

const ToolsPage = () => {
	const [isSettingsSchema, setIsSettingSchema] = useState(false)
	const [isInputSchema, setIsInputSchema] = useState(false)

	const mutation = useMutation<
		ToolFunction,
		Error,
		z.infer<typeof formSchema>
	>({
		mutationFn: async (data) => {
			const result = await createTool({
				...data,
				fnType: 'external',
				keyName: data.name.replaceAll(' ', '_').toLowerCase(),
			})
			return result
		},
		onError: () => {
			toast.error('Error creating tool')
		},
		onSuccess: () => {
			form.reset()
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: 'Poke API',
			shortDesc: 'Consulta toda la información de pokemones',
			description:
				'Esta tool sirve para consultar toda la info de pokemones, desc larga',
			aiDesc: 'Tool to get pokemon descriptions',
			endpoint: { url: 'http://localhost:4000', method: 'get' },
			imageUrl:
				'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate(values)
	}

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
			<Card className="col-span-full md:col-span-8">
				<CardHeader>
					<CardTitle className="text-2xl">Crear nueva tool function</CardTitle>
					<CardDescription>
						Formulario para crear nueva tool function para el marketplace
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							id="hook-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<Separator />
							<section className="space-y-4">
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
													Nombre de la tool function
												</FormDescription>
												<FormControl>
													<Input placeholder="Poke API" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Key name</FormLabel>
												<FormDescription>
													Clave unica de la función
												</FormDescription>
												<FormControl>
													<Input
														disabled
														placeholder="poke_api"
														{...field}
														value={field.value
															.replaceAll(' ', '_')
															.toLowerCase()}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="shortDesc"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descripción Corta</FormLabel>
											<FormDescription>
												Descripción corta que se mostrara a los usuarios en la
												página de marketplace
											</FormDescription>
											<FormControl>
												<Textarea className="resize-none" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descripción</FormLabel>
											<FormDescription>
												Descripción que se mostrara a los usuarios en la página
												de marketplace
											</FormDescription>
											<FormControl>
												<Textarea className="resize-none" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="aiDesc"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descripción para IA</FormLabel>
											<FormDescription>
												Descripción que sera enviada al modelo de IA para que
												entienda el uso de la función
											</FormDescription>
											<FormControl>
												<Textarea className="resize-none" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</section>
							<Separator />
							<section className="space-y-4">
								<h3 className="text-current font-semibold text-xl">
									Fetch Tool Config
								</h3>

								<FormField
									control={form.control}
									name="endpoint"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Api Url</FormLabel>
											<FormDescription>
												Api url donde se ejecutara la función
											</FormDescription>
											<FormControl>
												<InputUrl
													errors={{
														url: form.formState.errors?.endpoint?.url?.message,
														method:
															form.formState.errors?.endpoint?.method?.message,
													}}
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</section>
							<Separator />
							<section className="flex items-center gap-x-4">
								<Switch
									checked={isInputSchema}
									onCheckedChange={(v) => setIsInputSchema(v)}
									id="is-input-schema"
								/>
								<Label htmlFor="is-input-schema">Input Schema</Label>
							</section>
							<Separator />
							{isInputSchema && (
								<section>
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
							)}

							<h3 className="text-current font-semibold text-xl">
								Settings Schema
							</h3>

							<section className="flex items-center gap-x-4">
								<Switch
									checked={isSettingsSchema}
									onCheckedChange={(v) => setIsSettingSchema(v)}
									id="is-settings-schema"
								/>
								<Label htmlFor="is-settings-schema">Settings Schema</Label>
							</section>
							<Separator />

							{isSettingsSchema && (
								<section className="space-y-4">
									<FormField
										control={form.control}
										name="settingsSchema"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Settings Schema</FormLabel>
												<FormDescription>
													Schema de los settings que pondra el usuario
												</FormDescription>
												<FormControl>
													<InputSchema {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</section>
							)}
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button disabled={mutation.isPending} type="submit" form="hook-form">
						Publicar
					</Button>
				</CardFooter>
			</Card>
			<div className="col-span-1 md:col-span-4 space-y-4">
				<h3 className="text-current font-semibold text-xl">Visualización:</h3>
				<IntegrationCard
					className="w-full md:w-[300px]"
					integration={{
						keyName:
							form.watch('name').replaceAll(' ', '_').toLowerCase() ||
							'tool_function',
						name: form.watch('name') || 'Tool Function',
						description:
							form.watch('shortDesc') ||
							'Descripción corta de la tool function',
						id: 'tool_function',
						tags: [],
						fnType: 'external',
						aiDesc: form.watch('aiDesc') || 'Descripción para IA',
						imageUrl:
							'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
						shortDesc:
							form.watch('shortDesc') ||
							'Descripción corta de la tool function',
						inputSchema: form.watch('inputSchema') || [],
						settingsSchema: form.watch('settingsSchema') || [],
					}}
				/>
				<InstallIntegration
					variant="card"
					className="w-full md:w-[400px]"
					integration={{
						keyName:
							form.watch('name').replaceAll(' ', '_').toLowerCase() ||
							'tool_function',
						name: form.watch('name') || 'Tool Function',
						description:
							form.watch('shortDesc') ||
							'Descripción corta de la tool function',
						id: 'tool_function',
						tags: [],
						fnType: 'external',
						aiDesc: form.watch('aiDesc') || 'Descripción para IA',
						imageUrl:
							'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
						shortDesc:
							form.watch('shortDesc') ||
							'Descripción corta de la tool function',
						inputSchema: form.watch('inputSchema') || [],
						settingsSchema: form.watch('settingsSchema') || [],
					}}
				/>
			</div>
		</div>
	)
}

export default ToolsPage
