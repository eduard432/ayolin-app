'use client'

import { useState, useTransition, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Image from 'next/image'
import { Mail } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { DeleteAcountSection } from '@/components/DeleteAcount'

export default function UserSettings() {
	const { data: session, update } = useSession()
	const [imageUrl, setImageUrl] = useState(session?.user?.image || '')
	const [isPending, startTransition] = useTransition()
	const [userInfo, setUserInfo] = useState<{
		email: string
		role: string
	} | null>(null)
	const [enabled, setEnabled] = useState(false)

	const handleToggle = async (checked: boolean) => {
		setEnabled(checked)

		try {
			const res = await fetch('/api/v1/2fa', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ enabled: checked }),
			})

			if (!res.ok) throw new Error('Error en el servidor')

			const data = await res.json()
			toast.success(data.message)
		} catch {
			toast.error('No se pudo actualizar la configuración')
			setEnabled(!checked)
		}
	}

	useEffect(() => {
		if (!session?.user?.email) return

		const fetchUserInfo = async () => {
			const res = await fetch('/api/user/info', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: session?.user.email }),
			})

			const data = await res.json()
			if (res.ok) {
				setUserInfo(data)
			}
		}

		fetchUserInfo()
	}, [session?.user?.email])

	const handleSubmit = () => {
		startTransition(async () => {
			const res = await fetch('/api/v1/upload-avatar', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image: imageUrl }),
				credentials: 'include',
			})

			if (res.ok) {
				const data = await res.json()
				await update({ user: { ...session?.user, image: data.user.image } })
				toast.success('Foto actualizada')
				setImageUrl('')
			} else {
				toast.error('Error al actualizar la foto')
			}
		})
	}

	return (
		<div className="space-y-8">
			<h1 className="text-4xl font-bold text-foreground mt-5">Cuenta</h1>

			<div className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-foreground text-2xl">
							Nombre del Proyecto
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Label htmlFor="team-name" className="text-foreground">
							Este es el nombre visible de tu proyecto.
						</Label>
						<Input
							id="team-name"
							placeholder="ej. Proyectos Ayolin"
							className="mt-5"
						/>
						<p className="text-sm text-foreground mt-2 ">
							Máximo 32 caracteres.
						</p>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-end">
						<Button size="sm">Guardar</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div className="flex items-center gap-2">
							<Mail className="w-7 h-7 text-muted-foreground" />
							<CardTitle className="text-foreground text-2xl">
								Correo de la cuenta
							</CardTitle>
						</div>
					</CardHeader>

					<CardContent className="pt-4">
						<Label htmlFor="email" className="text-sm text-muted-foreground">
							Este es el correo asociado a tu cuenta:
						</Label>
						<p className="text-base font-medium text-foreground mt-2">
							{userInfo?.email || (
								<span className="italic text-muted-foreground">
									Cargando...
								</span>
							)}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-foreground text-2xl">
							Foto de Perfil
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Label htmlFor="team-url" className="text-foreground mb-4">
							Cambia tu foto de perfil.
						</Label>

						<div className="flex items-center gap-4">
							<Image
								src={imageUrl || 'https://github.com/shadcn.png'}
								alt="Avatar"
								width={64}
								height={64}
								className="rounded-full border border-neutral-300"
							/>
							<Input
								id="avatar-url"
								placeholder="https://..."
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								className="w-[3000px]"
							/>
						</div>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-end">
						<Button onClick={handleSubmit} disabled={isPending}>
							{isPending ? 'Guardando...' : 'Guardar'}
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-foreground text-2xl ">
							Verificación en dos pasos
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="team-name"
									className="text-foreground font-black"
								>
									¿Deseas habilitar la verificación en dos pasos?
								</Label>
								<p className="text-sm text-muted-foreground mt-2 ">
									Se te enviará un correo cada que trates de iniciar sesión.
								</p>
							</div>
							<Switch
								checked={enabled}
								onCheckedChange={handleToggle}
								className="ml-4 mt-1"
							/>
						</div>
					</CardContent>
					<CardFooter className="pt-2">
						{enabled ? (
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

				<DeleteAcountSection />
			</div>
		</div>
	)
}
