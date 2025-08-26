'use client'

import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewPasswordSchema } from '@/schemas'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/ui/FormError'
import { FormSucces } from '@/components/ui/FormSuccess'

import { newPassword } from '@/actions/new-password'

const NewPasswordForm = ({ token }: { token: string }) => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error)
				setSuccess(data?.success)
			})
		})
		console.log(values)
	}

	return (
		<CardWrapper
			headerLabel="Ingresa la nueva contraseña"
			backButtonLabel="Volver al inicio de sesión"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						{/* Contraseña */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar contraseña</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSucces message={success} />
					<Button 
						disabled={isPending} 
						type="submit" 
                    	className="
							w-full bg-white text-black
							hover:!bg-white active:!bg-white
							dark:hover:!bg-white dark:active:!bg-white
							transition-none
                    	"
					>
						Restablecer contraseña
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default NewPasswordForm
