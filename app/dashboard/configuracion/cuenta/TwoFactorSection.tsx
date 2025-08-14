import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export const TwoFactorSection = ({ user }: { user: User }) => {
	const queryClient = useQueryClient()

	// Query key consistente con useGetUser
	const userQueryKey = ['user', user.id]

	const mutation = useMutation<
		boolean,
		Error,
		boolean,
		{ previousUser: User | undefined; newValue: boolean }
	>({
		mutationFn: async (enabled) => {
			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			const res = await fetch('/api/v1/2fa', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ enabled }),
			})

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}))
				throw new Error(errorData.message || 'Error en el servidor')
			}

			return enabled
		},
		onMutate: async (enabled) => {
			await queryClient.cancelQueries({ queryKey: userQueryKey })
			const previousUser = queryClient.getQueryData<User>(userQueryKey)

			queryClient.setQueryData(userQueryKey, (old: User | undefined) => {
				if (!old) return old
				return {
					...old,
					isTwoFactorEnabled: enabled,
				}
			})

			return { previousUser, newValue: enabled }
		},
		onSuccess: (_, __, context) => {
			// Usar el valor del contexto en lugar del estado actual
			toast.success(
				`Verificación en dos pasos ${context?.newValue ? 'activada' : 'desactivada'}`
			)
		},
		onError: (error, _, context) => {
			toast.error(`Error: ${error.message}`)
			if (context?.previousUser) {
				queryClient.setQueryData(userQueryKey, context.previousUser)
			}
		},
	})

	const handleToggle = (value: boolean) => {
		if (!user) {
			toast.error('Usuario no encontrado')
			return
		}
		mutation.mutate(value)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-foreground text-2xl">
					Verificación en dos pasos
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<Label
							htmlFor="two-factor-switch"
							className="text-foreground font-black"
						>
							¿Deseas habilitar la verificación en dos pasos?
						</Label>
						<p className="text-sm text-muted-foreground mt-2">
							Se te enviará un correo cada que trates de iniciar sesión.
						</p>
					</div>
					<Switch
						id="two-factor-switch"
						checked={user.isTwoFactorEnabled}
						onCheckedChange={handleToggle}
						disabled={mutation.isPending}
						className="ml-4 mt-1"
					/>
				</div>
			</CardContent>
			<CardFooter className="pt-2">
				{user.isTwoFactorEnabled ? (
					<p className="text-sm text-green-600 font-medium">
						Verificación habilitada
					</p>
				) : (
					<p className="text-sm text-destructive font-medium">
						Verificación desabilitada
					</p>
				)}
			</CardFooter>
		</Card>
	)
}
