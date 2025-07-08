'use client'

import React, { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from './ui/card'
import { Binary, Hash, Trash, Type } from 'lucide-react'

type FieldType = 'string' | 'number' | 'boolean'

const schema = z.object({
	name: z.string(),
	description: z.string(),
	type: z.enum(['string', 'number', 'boolean']),
	required: z.boolean(),
})

export const InputSchema = () => {
	const [fields, setFields] = useState<z.infer<typeof schema>[]>([])

	const [type, setType] = useState<FieldType>('string')
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [isRequired, setIsRequired] = useState<boolean>(false)

	const onAddField = () => {
		setFields((prevFields) => [
			...prevFields,
			{
				name,
				description,
				required: isRequired,
				type,
			},
		])

		setName('')
		setDescription('')
		setIsRequired(false)
	}

	const onDeleteField = (index: number) => {
		setFields((prevFields) => prevFields.filter((value, i) => i !== index))
	}

	return (
		<section className="space-y-4">
			<div className="flex justify-between">
				<Select
					value={type}
					onValueChange={(value: FieldType) => setType(value)}
				>
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
				<Button type="button" onClick={onAddField}>
					Agregar
				</Button>
			</div>
			<div className="space-y-4">
				<FormItem>
					<FormLabel>Nombre del campo</FormLabel>
					<FormControl>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</FormControl>
				</FormItem>
				<FormItem>
					<FormLabel>Descripción del campo</FormLabel>
					<FormControl>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
				</FormItem>
				<FormItem className="flex flex-row items-center gap-2">
					<FormControl>
						<Checkbox
							checked={isRequired}
							onCheckedChange={(checked) => {
								const value = checked.valueOf()
								setIsRequired(typeof value == 'string' ? false : value)
							}}
						/>
					</FormControl>
					<FormLabel>Requerido</FormLabel>
				</FormItem>
			</div>
			<div className="space-y-2">
				{fields.map(({ name, type }, i) => (
					<Card className="py-2" key={name}>
						<CardContent className="px-4 flex justify-between">
							<p className="capitalize font-semibold text-sm flex items-center">
								<span className="text-sm">
									{type === 'string' && <Type />}
									{type === 'number' && <Hash />}
									{type === 'boolean' && <Binary />}
								</span>

								<span className="mx-2">{name}</span>
							</p>
							<Button
                onClick={() => onDeleteField(i)}
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
