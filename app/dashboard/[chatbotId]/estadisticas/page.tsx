'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { useChatbot } from '@/data/chatbot/chatbot.client'
import { Skeleton } from '@/components/ui/skeleton'

export default function EstadisticasPage() {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)

	return (
		<>
			{chatbot ? (
				<div className="space-y-8">
					<div>
						<h1 className="text-4xl font-semibold tracking-tight text-foreground">
							Estadisticas {chatbot.name}
						</h1>
						<p className="text-sm text-muted-foreground">
							Informacion actualizada sobre tu chatbot
						</p>
					</div>

					<Separator />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Mensajes</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-3xl font-bold">{chatbot.totalMessages}</p>
								<p className="text-sm text-muted-foreground">
									Ultimos 30 dias
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Chats</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-3xl font-bold">{chatbot.totalChats}</p>
								<p className="text-sm text-muted-foreground">
									Ultimos 30 dias
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Uso</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-3xl font-bold">
									{new Intl.NumberFormat('en-MX', {
										style: 'currency',
										currency: 'MXN',
										maximumFractionDigits: 4,
									}).format(chatbot.creditUsage * 20)}
								</p>
								<p className="text-sm text-muted-foreground">
									Ultimos 30 dias
								</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="flex justify-between items-center text-2xl">
								Chatbot activo
								<Badge variant="outline" className="h-7 w-20">
									Producción
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-muted p-4 rounded-lg">
									<p className="font-medium">Nombre del chatbot:</p>
									<p className="text-muted-foreground">{chatbot.name}</p>
								</div>
								<div className="bg-muted p-4 rounded-lg">
									<p className="font-medium">Hecho para:</p>
									<p className="text-muted-foreground truncate">
										{chatbot.initialPrompt}
									</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className="gap-4 flex flex-col md:flex-row ">
							{/* <div className="w-full">
						<p className="text-sm text-muted-foreground">
							Ultima actualizacion:{' '}
						</p>
						<p className="text-sm"></p>
					</div> */}
							<div className="flex gap-x-2">
								{/* <Button variant="outline" size="sm">
							Ver logs
						</Button> */}
								{/* <Button variant="destructive" size="sm">
							Reiniciar
						</Button> */}
							</div>
						</CardFooter>
					</Card>
				</div>
			) : (
				<div className="space-y-8">
					{/* Header */}
					<div>
						<Skeleton className="h-10 w-64" />
						<Skeleton className="h-4 w-48 mt-2" />
					</div>

					<Separator />

					{/* Cards grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
						{[...Array(3)].map((_, i) => (
							<Card key={i} className="p-4">
								<CardHeader>
									<Skeleton className="h-6 w-32" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-8 w-20 mb-2" />
									<Skeleton className="h-4 w-28" />
								</CardContent>
							</Card>
						))}
					</div>

					{/* Active chatbot card */}
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<Skeleton className="h-6 w-40" />
								<Skeleton className="h-7 w-20 rounded-md" />
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{[...Array(2)].map((_, i) => (
									<div key={i} className="bg-muted p-4 rounded-lg">
										<Skeleton className="h-4 w-32 mb-2" />
										<Skeleton className="h-4 w-full" />
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter className="gap-4 flex flex-col md:flex-row">
							<div className="flex gap-x-2">
								<Skeleton className="h-8 w-24" />
								<Skeleton className="h-8 w-24" />
							</div>
						</CardFooter>
					</Card>
				</div>
			)}
		</>
	)
}
