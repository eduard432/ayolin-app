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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string(),
	description: z.string(),
	blogDescription: z.string(),
	apiUrl: z.string(),
})

const ToolsPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	return (
		<Card className="mx-auto w-full">
			<CardHeader>
				<CardTitle>Crear nueva tool function</CardTitle>
				<CardDescription>
					Formulario para crear nueva tool function para el marketplace
				</CardDescription>
				<CardAction>
					<Button>Crear</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="gap-4 grid grid-cols-3" onSubmit={() => {}}>
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
												placeholder="poke-api"
												{...field}
												value={field.value.replaceAll(' ', '-').toLowerCase()}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormDescription className="min-h-12">
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
							name="blogDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción para el blog</FormLabel>
									<FormDescription className="min-h-12">
										Descripción que se mostrara a los usuarios en la página de
										marketplace
									</FormDescription>
									<FormControl>
										<Textarea className="resize-none" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
            <Separator className="col-span-full" />
						<FormField
							control={form.control}
							name="apiUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Api Url</FormLabel>
									<FormDescription>Api url donde se ejecutara la función</FormDescription>
									<FormControl>
										<Input
											placeholder="https://localhost:4000/api/v1/poke-api"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default ToolsPage
