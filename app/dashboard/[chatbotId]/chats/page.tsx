'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const dummyChart = [
	{
		status: 'Success',
		user: 'ken99@yahoo.com',
		message: '¿Cuál es el horario de atención?',
		date: '2025-06-24 15:40',
	},
	{
		status: 'Success',
		user: 'abe45@gmail.com',
		message: 'Gracias por la respuesta',
		date: '2025-06-24 14:02',
	},
	{
		status: 'Processing',
		user: 'monserrat44@gmail.com',
		message: '¿Pueden ayudarme con mi pedido?',
		date: '2025-06-23 20:16',
	},
	{
		status: 'Success',
		user: 'silas22@gmail.com',
		message: 'Quiero actualizar mi información',
		date: '2025-06-23 18:00',
	},
	{
		status: 'Failed',
		user: 'carmella@hotmail.com',
		message: 'No se pudo enviar la respuesta',
		date: '2025-06-22 11:11',
	},
]

export default function ChatsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-4xl font-semibold tracking-tight">
					Historial de chats
				</h1>
				<p className="text-sm text-muted-foreground">
					Visualiza los chats recientes
				</p>
			</div>

			<Separator />

			<div className="flex gap-4 items-center">
				<Input
					type="text"
					placeholder="Filtrar por usuarios o mensajes..."
					className="max-w-sm bg-background h-10"
				/>
				<Button variant="outline">Columnas</Button>
			</div>

			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="font-black">Estados</TableHead>
							<TableHead className="font-black">Usuario</TableHead>
							<TableHead className="font-black">Mensajes</TableHead>
							<TableHead className="font-black">Fecha</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dummyChart.map((chat, index) => (
							<TableRow key={index}>
								<TableCell>{chat.status}</TableCell>
								<TableCell>{chat.user}</TableCell>
								<TableCell>{chat.message}</TableCell>
								<TableCell>{chat.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>

			<div className="flex justify-end gap-2">
				<Button variant="outline" size="sm">
					Anterior
				</Button>
				<Button variant="outline" size="sm">
					Siguiente
				</Button>
			</div>
		</div>
	)
}
