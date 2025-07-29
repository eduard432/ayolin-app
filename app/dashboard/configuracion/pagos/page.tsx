'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function UserSettings() {
    const { data: session } = useSession()
    const [userInfo, setUserInfo] = useState<{
        email: string
        role: string
    } | null>(null)

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


    const handlePortal = async () => {
        try{
            const res = await fetch('/api/v1/stripe/portal', { method: 'POST'})
            const data = await res.json()

            if(res.ok){
                window.location.href = data.url
            } else {
                toast.error('Error al abrir el portal de suscripción')
            }
        } catch {
            toast.error('Error inesperado')
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-foreground mt-5">Cuenta</h1>

            <div className="space-y-4">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-foreground text-2xl">
                                Tipo de cuenta
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <Label
                            htmlFor="account-type"
                            className="text-sm text-muted-foreground"
                        >
                            Esta cuenta está registrada como:
                        </Label>
                        <p className="text-lg font-semibold text-foreground mt-2 capitalize">
                            {userInfo?.role || (
                                <span className="italic text-muted-foreground">
                                    Cargando...
                                </span>
                            )}
                        </p>
                    </CardContent>
                </Card>

                {userInfo?.role === 'PRO' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-foreground text-2xl'>
                                Gestionar suscripción
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground mb-4'>
                                Redirígete al portal de Stripe para cancelar tu suscripción, ver facturas o actualizar tu método de pago.
                            </p>
                            <Button onClick={handlePortal}>Ir al portal de suscripción</Button>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    )
}
