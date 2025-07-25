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
import { useChatbot } from '@/data/chatbot.client'
import { useParams } from 'next/navigation'
import { useChats } from '@/data/chat.client'
import { Skeleton } from '@/components/ui/skeleton'

const ChatTableSkeleton = () => {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-4 w-24" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-32" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-32" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-20" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-8" />
			</TableCell>
		</TableRow>
	)
}

export default function ChatsPage() {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { isLoading: isLoadingChatbot, data: chatbot } = useChatbot(chatbotId)
	const { isLoading: isLoadingChats, data: chats } = useChats(
		chatbot?.id || ''
	)

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
							<TableHead className="font-black">Nombre</TableHead>
							<TableHead className="font-black">Ultima vez activo</TableHead>
							<TableHead className="font-black">Creado el</TableHead>
							<TableHead className="font-black">Id</TableHead>
							<TableHead className="font-black">Mensajes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{(isLoadingChatbot || isLoadingChats) &&
							Array.from({ length: 5 }).map((_, i) => (
								<ChatTableSkeleton key={i} />
							))}

						{chats &&
							chats.map((chat) => (
								<TableRow key={chat.id}>
									<TableCell>{chat.name ? chat.name : '---'}</TableCell>
									<TableCell>{chat.lastActive.toString()}</TableCell>
									<TableCell>{chat.createdAt.toString()}</TableCell>
									<TableCell>{chat.id}</TableCell>
									<TableCell>{chat.totalMessages}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Card>

			<div className="flex justify-end gap-2">
				<Button disabled variant="outline" size="sm">
					Anterior
				</Button>
				<Button variant="outline" size="sm">
					Siguiente
				</Button>
			</div>
		</div>
	)
}
