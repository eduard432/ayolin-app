'use client'

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
import { useGetUser } from '@/data/user/user.client'

export default function UserSettings() {
    const { data: session } = useSession()
    const { data: user } = useGetUser(session?.user?.id || '')

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
                            {user?.role || (
                                <span className="italic text-muted-foreground">
                                    Cargando...
                                </span>
                            )}
                        </p>
                    </CardContent>
                </Card>

                {user?.role === 'PRO' && (
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
