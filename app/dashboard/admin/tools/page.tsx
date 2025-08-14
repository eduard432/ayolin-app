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
import { InputSchema } from '@/components/ui/InputSchema'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { fieldSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchemaCommon = {
	name: z.string(),
	blogDescription: z.string(),
	settingsSchema: fieldSchema.array().optional(),
}

const formSchemaUnion = z.discriminatedUnion('type', [
	z.object({
		...formSchemaCommon,
		type: z.literal('code'),
	}),
	z.object({
		...formSchemaCommon,
		type: z.literal('fetch'),
		description: z.string(),
		apiUrl: z.string(),
		inputSchema: fieldSchema.array(),
	}),
])

const ToolsPage = () => {
	const [isFetchTool, setIsFetchTool] = useState(false)
	const [isSettingsSchema, setIsSettingSchema] = useState(false)

	const form = useForm<z.infer<typeof formSchemaUnion>>({
		resolver: zodResolver(formSchemaUnion),
		defaultValues: {
			name: '',
		},
	})

	const handleSubmit = () => {
		form.handleSubmit((values) => {
			console.log('Formulario enviado:', values)
			// Tu lógica aquí
		})() // ← Nota los paréntesis extra para ejecutar
	}

	return (
		<Card className="mx-auto w-full md:w-1/2">
			<CardHeader>
				<CardTitle className="text-2xl">Crear nueva tool function</CardTitle>
				<CardDescription>
					Formulario para crear nueva tool function para el marketplace
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-4" onSubmit={() => {}}>
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
								name="blogDescription"
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
						</section>
						<Separator />
						<section className="flex items-center gap-x-4">
							<Switch
								checked={isFetchTool}
								onCheckedChange={(v) => setIsFetchTool(v)}
								id="tool-mode"
							/>
							<Label htmlFor="tool-mode">Fetch Tool</Label>
						</section>
						<Separator />
						{isFetchTool && (
							<section className="space-y-4">
								<h3 className="text-current font-semibold text-xl">
									Fetch Tool
								</h3>
								<FormField
									control={form.control}
									name="description"
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
								<FormField
									control={form.control}
									name="apiUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Api Url</FormLabel>
											<FormDescription>
												Api url donde se ejecutara la función
											</FormDescription>
											<FormControl>
												<Input
													placeholder="https://localhost:4000/api/v1/poke-api"
													{...field}
												/>
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
							</section>
						)}
						<Separator />
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
								<h3 className="text-current font-semibold text-xl">
									Settings Schema
								</h3>

								<FormField
									control={form.control}
									name="inputSchema"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Input Schema</FormLabel>
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
				<Button type="button" onClick={handleSubmit}>
					Publicar
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ToolsPage
