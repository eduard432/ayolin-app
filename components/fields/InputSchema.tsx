'use client'

import React, { useEffect, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Binary, Hash, Trash, Type } from 'lucide-react'
import { cn, fieldSchema, toSnakeCase, toTitleCase } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type InputSchemaProps = {
	onChange: (value: z.infer<typeof fieldSchema>[]) => void
	value?: z.infer<typeof fieldSchema>[]
	className?: string
}

export const InputSchema = ({
	className,
	onChange,
	value,
}: InputSchemaProps) => {
	const [fields, setFields] = useState<z.infer<typeof fieldSchema>[]>(
		value || []
	)

	const form = useForm<z.infer<typeof fieldSchema>>({
		resolver: zodResolver(fieldSchema),
		defaultValues: {
			name: '',
			description: '',
			type: 'string',
			required: false,
		},
	})

	useEffect(() => {
		onChange(fields)
	}, [fields, onChange])

	const handleAddField = form.handleSubmit((newField) => {
		setFields((prevFields) => [
			...prevFields,
			{ ...newField, name: toSnakeCase(newField.name) },
		])
		form.reset()
	})

	const handleDeleteField = (index: number) => {
		setFields((prevFields) => prevFields.filter((_, i) => i !== index))
	}

	return (
		<section className={cn('space-y-4', className)}>
			<FormField
				control={form.control}
				name="type"
				render={({ field }) => (
					<div className="flex justify-between">
						<Select value={field.value} onValueChange={field.onChange}>
							<SelectTrigger className="w-1/2">
								<SelectValue placeholder="Tipo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="string">
									<Type /> String
								</SelectItem>
								<SelectItem value="number">
									<Hash /> Number
								</SelectItem>
								<SelectItem value="boolean">
									<Binary /> Boolean
								</SelectItem>
							</SelectContent>
						</Select>
						<Button size="sm" type="button" onClick={handleAddField}>
							Agregar
						</Button>
					</div>
				)}
			/>

			<div className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del campo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción del campo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="required"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center gap-2">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) =>
										field.onChange(
											typeof checked === 'boolean' ? checked : false
										)
									}
								/>
							</FormControl>
							<FormLabel>Requerido</FormLabel>
						</FormItem>
					)}
				/>
			</div>

			<div className="space-y-2">
				{fields.map(({ name, type }, i) => (
					<Card className="py-1" key={`${name}-${i}`}>
						<CardContent className="px-4 flex justify-between">
							<p className="capitalize font-semibold text-sm flex items-center">
								<span className="text-sm">
									{type === 'string' && <Type size={16} />}
									{type === 'number' && <Hash size={16} />}
									{type === 'boolean' && <Binary size={16} />}
								</span>

								<span className="mx-2 capitalize">{toTitleCase(name)}</span>
							</p>
							<Button
								onClick={() => handleDeleteField(i)}
								type="button"
								className="text-transparent hover:bg-accent"
								variant="ghost"
								size="icon"
							>
								<Trash />
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
