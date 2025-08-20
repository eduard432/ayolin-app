'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { signOut } from 'next-auth/react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog'

export function DeleteAcountSection() {
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = async () => {
		setIsLoading(true)

		const res = await fetch('/api/v1/user', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password }),
		})

		if (res.ok) {
			toast.success('Cuenta Eliminada')
			await signOut({ callbackUrl: '/' })
		} else {
			const data = await res.json()
			toast.error(data.message || 'Error al borrar la cuenta')
		}

		setIsLoading(false)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-destructive text-2xl">
					Eliminar Cuenta
				</CardTitle>
			</CardHeader>

			<CardContent>
				<p className="text-sm text-muted-foreground mb-4">
					Esta acción eliminará tu cuenta permanentemente. No se puede
					deshacer.
				</p>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Borrar cuenta</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
							<AlertDialogDescription>
								Esta acción no se puede deshacer. Escribe tu contraseña para
								confirmar.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<div className="space-y-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Tu contraseña"
							/>
						</div>

						<AlertDialogFooter className="mt-4">
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction asChild>
								<Button
									variant="destructive"
									onClick={handleDelete}
									disabled={isLoading || password.length === 0}
								>
									{isLoading ? 'Eliminando...' : 'Eliminar cuenta'}
								</Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	)
}
