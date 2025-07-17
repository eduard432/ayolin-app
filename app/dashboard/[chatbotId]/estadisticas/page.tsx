'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useChatbot } from '@/data/chatbot.client'

export default function EstadisticasPage() {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data } = useChatbot(chatbotId)

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-4xl font-semibold tracking-tight text-foreground">
					Estadisticas {data && data.name}
				</h1>
				<p className="text-sm text-muted-foreground">
					Informacion actualizada sobre tu chatbot
				</p>
			</div>

			<Separator />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Mensajes</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold ">1,234</p>
						<p className="text-sm text-muted-foreground">Ultimos 30 dias</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Chats</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">32</p>
						<p className="text-sm text-muted-foreground">Ultimos 30 dias</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Ventas</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">56</p>
						<p className="text-sm text-muted-foreground">Ultimos 30 dias</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between items-center text-2xl">
						Chatbot activo
						<Badge variant="outline" className='h-7 w-20'>Producción</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-muted p-4 rounded-lg">
							<p className="font-medium">Nombre del chatbot:</p>
							<p className="text-muted-foreground">{data && data.name}</p>
						</div>
						<div className="bg-muted p-4 rounded-lg">
							<p className="font-medium">Hecho para:</p>
							<p className="text-muted-foreground">ventas-asistente</p>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">
								Ultima actualizacion:{' '}
							</p>
							<p className="text-sm">24 junio 2025 - 14:30 </p>
						</div>

						<div className="flex gap-2">
							<Button variant="outline" size="sm">
								Ver logs
							</Button>
							<Button variant="destructive" size="sm">
								Reiniciar
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// /dashboard/jenfjnefuy348u3843/overview
{
	/*const Page = ({params}: {params: {chatbotId: string}}) => */
}
