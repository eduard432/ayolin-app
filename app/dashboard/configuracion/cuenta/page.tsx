'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Mail, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { GeneratedAvatar } from '@/components/ui/GeneratedAvatar'
import { AVATAR_COLORS, type ColorClass } from '@/lib/avatar'
import { DeleteAcountSection } from '@/app/dashboard/configuracion/cuenta/DeleteAcount'
import { TwoFactorSection } from './TwoFactorSection'
import { useGetUser } from '@/data/user/user.client'

export default function UserSettings() {
	const { data: session, update } = useSession()
	const { data: user } = useGetUser(session?.user?.id || '')

	const [currentColor, setCurrentColor] = useState<ColorClass | null>(null)
	const [selected, setSelected] = useState<ColorClass | null>(null)
	const [saving, setSaving] = useState(false)

	const handleSave = async () => {
		if (selected === undefined) return
		setSaving(true)
		try {
			const res = await fetch('/api/v1/avatar-color', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ colorClass: selected ?? null }),
			})
			if (!res.ok) throw new Error('No se pudo guardar')

			setCurrentColor(selected ?? null)

			await update({ avatarColor: selected ?? null })

			toast?.success?.('Color actualizado')
		} catch (e) {
			const err = e as Error
			toast?.error?.(err.message ?? 'Error al guardar')
		} finally {
			setSaving(false)
		}
	}

	const userName = session?.user?.name || session?.user?.email || 'U'

	return (
		<div className="space-y-8">
			<h1 className="text-4xl font-bold text-foreground mt-5">Cuenta</h1>

			<div className="space-y-4">
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
							{user?.email || (
								<span className="italic text-muted-foreground">
									Cargando...
								</span>
							)}
						</p>
					</CardContent>
				</Card>

				<Card className="w-full">
					<CardHeader>
						<CardTitle>Color de tu avatar</CardTitle>
						<CardDescription>
							Personaliza el fondo de tu inicial.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="flex items-center gap-4">
							<GeneratedAvatar
								name={userName}
								size="w-14 h-14"
								colorClass={selected ?? currentColor}
							/>
							<div className="text-sm text-muted-foreground">
								Vista previa •{' '}
								{selected
									? selected.replace('bg-', '').replace('-500', '')
									: 'automático'}
							</div>
						</div>

						<div className="grid grid-cols-6 gap-4">
							{AVATAR_COLORS.map((c) => {
								const isActive = selected === c
								return (
									<button
										key={c}
										type="button"
										aria-label={c}
										className={cn(
											'h-12 w-12 rounded-full border transition hover:scale-105 focus:outline-none focus:ring-2',
											c,
											isActive ? 'ring-2 ring-offset-2' : 'border-border'
										)}
										onClick={() => setSelected(c)}
									>
										{isActive && (
											<Check className="mx-auto h-5 w-5 text-white" />
										)}
									</button>
								)
							})}
						</div>

						<div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSelected(null)}
							>
								Usar colores automático
							</Button>
						</div>
					</CardContent>

					<CardFooter className="justify-end gap-2">
						<Button
							variant="outline"
							onClick={() => setSelected(currentColor)}
						>
							Cancelar
						</Button>
						<Button
							onClick={handleSave}
							disabled={saving || selected === currentColor}
						>
							{saving ? 'Guardando...' : 'Guardar'}
						</Button>
					</CardFooter>
				</Card>

				{user && <TwoFactorSection user={user} />}

				<DeleteAcountSection />
			</div>
		</div>
	)
}
