import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Send } from 'lucide-react'

interface ChatSkeletonProps {
	className?: string
	messageCount?: number
}

export function ChatSkeleton({
	className,
	messageCount = 6,
}: ChatSkeletonProps) {
	return (
		<section
			className={cn(
				'rounded-md border h-full border-border p-4 w-full flex flex-col justify-between gap-4 flex-1',
				className
			)}
		>
			<ul className="overflow-y-auto h-96 px-4">
				{Array.from({ length: messageCount }).map((_, i) => {
					// Alterna entre mensajes de usuario y bot
					const isUser = i % 2 === 0

					return (
						<li
							key={i}
							className={`my-6 flex ${isUser ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={cn(
									'px-4 py-3 rounded-md max-w-10/12 md:max-w-2/3',
									isUser
										? 'bg-[#e0e0e0] dark:bg-[#374151] rounded-br-none'
										: 'bg-[#f5f5f5] dark:bg-[#4b5563] rounded-bl-none'
								)}
							>
								{/* Simula líneas de texto de diferentes longitudes */}
								<div className="space-y-2">
									<Skeleton
										className={cn(
											'h-4',
											isUser
												? 'w-[120px]' // Mensajes de usuario más cortos
												: 'w-[200px]' // Mensajes del bot más largos
										)}
									/>
									{/* Línea adicional ocasional para simular mensajes más largos */}
									{i % 3 === 0 && (
										<Skeleton
											className={cn('h-4', isUser ? 'w-[80px]' : 'w-[150px]')}
										/>
									)}
								</div>
							</div>
						</li>
					)
				})}
			</ul>

			{/* Input form skeleton */}
			<div className="rounded-full border border-border w-full flex items-center">
				<div className="w-full py-2 px-4">
					<Skeleton className="h-6 w-full" />
				</div>
				<Button
					disabled
					size="icon"
					variant="ghost"
					className="rounded-full opacity-50"
				>
					<Send />
				</Button>
			</div>
		</section>
	)
}
