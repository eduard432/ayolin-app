import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { cn } from '@/lib/utils'
import z from 'zod'

export const UrlValueSchema = z.object({
	url: z.string().url('Debe ser una URL válida'),
	method: z.enum(['get', 'post', 'put', 'delete']),
})

type UrlFieldProps = {
	value: z.infer<typeof UrlValueSchema>
	onChange: (value: z.infer<typeof UrlValueSchema>) => void
	className?: string
	errors: {
		url?: string
		method?: string
	}
}

export const InputUrl = ({
	value,
	onChange,
	className,
	errors,
}: UrlFieldProps) => {
	const colorMap = {
		get: 'text-emerald-600',
		post: 'text-amber-500',
		put: 'text-blue-600',
		delete: 'text-red-600',
	}

	return (
		<div className={cn('flex gap-x-2 gap-y-4', className)}>
			<Select
				onValueChange={(newValue) =>
					onChange({
						...value,
						method: newValue as z.infer<typeof UrlValueSchema>['method'],
					})
				}
			>
				<SelectTrigger
					className={cn(
						'font-semibold w-[120px]',
						colorMap[value.method],
						errors?.method && 'border-red-500'
					)}
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="font-semibold">
					<SelectItem className={cn(colorMap['get'])} value="get">
						GET
					</SelectItem>
					<SelectItem className={cn(colorMap['post'])} value="post">
						POST
					</SelectItem>
					<SelectItem className={cn(colorMap['put'])} value="put">
						PUT
					</SelectItem>
					<SelectItem className={cn(colorMap['delete'])} value="delete">
						DELETE
					</SelectItem>
				</SelectContent>
			</Select>

			<Input
				placeholder="https://localhost:4000/api/v1/poke-api"
				value={value.url}
				onChange={(e) => onChange({ ...value, url: e.target.value })}
				className={cn(errors.url && 'border-red-500')}
			/>
		</div>
	)
}
