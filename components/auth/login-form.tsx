/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { FormError } from '@/components/form-error'
import { FormSucces } from '@/components/form-succes'
import Link from "next/link"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import { login } from '@/actions/login'

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [succes, setSucces] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSucces('')

		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error)
				setSucces(data?.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel="Bienvenido de vuelta"
			backButtonLabel="No tienes cuenta?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="ejem@gmail.com"
											type="email"
										/>
									</FormControl>
									<FormMessage className="text-red-500 mb-2" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mt-4">Contraseña</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="*********"
											type="password"
										/>
									</FormControl>
									<FormMessage className="text-red-500 mb-2" />
									<Button
										size="sm"
										variant="link"
										asChild
										className='font-normal text-sm flex justify-start pt'
									>
										<Link href="/auth/reset">
											Olvidaste tu contraseña? 
										</Link>
									</Button>
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSucces message={succes} />
					<Button
						disabled={isPending}
						type="submit"
						className="w-full mt-4 h-11"
					>
						Inicia sesión
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
