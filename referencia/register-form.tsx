{/*

'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/referencia/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/referencia/ui/card'
import { Input } from '@/referencia/ui/input'
import { Label } from '@/referencia/ui/label'
import Link from 'next/link'

type Inputs = {
	email: string
	password1: string
	password2: string
}

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log('Email: ', data.email)
		console.log('Password1: ', data.password1)
		console.log('Password2: ', data.password2)
	}

	const password1 = watch('password1')

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Registrarse</CardTitle>
					<CardDescription>
						Ingresa tu correo electrónico y contraseña para crear una cuenta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="nom@ejemplo.com"
									{...register('email', { required: 'Email is required' })}
								/>{' '}
								{errors.email && (
									<span className="text-red-500 text-sm">
										{errors.email.message}
									</span>
								)}
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password">Contraseña</Label>
								<Input
									id="password1"
									type="password1"
									{...register('password1', {
										required: 'Password is required',
										minLength: { value: 6, message: 'Minimo 6 caracteres' },
									})}
								/>
								{errors.password1 && (
									<span className="text-red-500 text-sm">
										{errors.password1.message}
									</span>
								)}
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password-confirm">Confirmar contraseña</Label>
								<Input
									id="password2"
									type="password2"
									{...register('password2', {
										required: 'Por favor confirmar la contraseña',
										validate: (value) =>
											value === password1 || 'No son iguales las contraseñas',
									})}
								/>
								{errors.password2 && (
									<span className="text-red-500 text-sm">
										{errors.password2.message}
									</span>
								)}
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									Registrarse
								</Button>
								<Button variant="outline" className="w-full">
									Login con GitHub
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							No tienes cuenta?{' '}
							<Link href="/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
*/}