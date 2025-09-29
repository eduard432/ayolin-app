'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import {
	FormEvent,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react'
import { ObjectId } from 'bson'
import { ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { MarkdownRender } from './MarkdownRender'
import Link from 'next/link'
import { toast } from 'sonner'

type ChatProps = {
	initialMessages: UIMessage[]
	chatId: string
	className?: string
	chatbotId?: string
}

const Chat = ({
	initialMessages,
	chatId,
	className,
	chatbotId,
}: ChatProps) => {
	const [input, setInput] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const queryClient = useQueryClient()

	const { messages, sendMessage, status, setMessages } = useChat({
		messages: initialMessages,
		generateId: () => new ObjectId().toString(),
		transport: new DefaultChatTransport({
			api: `/api/v1/chat/${chatId}/stream`,
			prepareSendMessagesRequest({ messages, id, body }) {
				return {
					body: {
						id,
						message: messages.at(-1),
						...body,
					},
				}
			},
		}),
		onFinish: () => {
			queryClient.invalidateQueries({
				queryKey: ['chatbot', chatId, 'messages'],
			})
		},
		onError: (error) => {
			console.log({error})
			toast.error(error.message)
		}
	})

	useEffect(() => {
		setMessages(initialMessages)
	}, [initialMessages, setMessages])

	useEffect(() => {
		if (status === 'streaming') {
			const interval = setInterval(() => {
				if (messagesEndRef.current) {
					messagesEndRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'end',
					})
				}
			}, 100) // Cada 100ms mientras está cargando

			return () => clearInterval(interval)
		}
	}, [status])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		sendMessage({ text: input })
		setInput('')
	}

	const handleSubmitKey: KeyboardEventHandler<HTMLTextAreaElement> = (
		event
	) => {
		// Verifica si se presionaron Enter + Ctrl
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault() // Evita que se inserte una nueva línea en el textarea
			sendMessage({ text: input })
			setInput('')
		}
	}

	return (
		<section className={cn('w-full', className)}>
			<Button asChild variant="outline" className="left-0 fixed z-20 m-4">
				<Link
					href={
						chatbotId
							? `/dashboard/${chatbotId}/estadisticas`
							: '/dashboard/general'
					}
				>
					<ArrowLeft /> Dashboard
				</Link>
			</Button>
			<div className="z-10 items-center p-4 px-8 flex justify-center fixed w-full bg-neutral-950/90 top-0 backdrop-blur-sm border-b-card border-b">
				<Link
					href="/"
					className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
				>
					AYOLIN
				</Link>
			</div>
			<div className="py-12" />
			<ul className="h-screen px-2 w-11/12 md:w-8/12 mx-auto">
				{messages.map((message) =>
					message.parts.map((part) => {
						switch (part.type) {
							case 'text':
								return (
									<li
										key={`${message.id}:${part.type}`}
										className={cn('my-6 flex', {
											'justify-end': message.role == 'user',
											'w-full': message.role != 'user',
										})}
									>
										<div
											className={cn(
												'px-4 py-1 rounded-md text-foreground',
												message.role == 'user'
													? 'bg-[#e0e0e0] dark:bg-[#374151] rounded-br-none max-w-10/12 md:max-w-2/3'
													: 'bg-transparent rounded-bl-none'
											)}
										>
											<MarkdownRender>{part.text}</MarkdownRender>
										</div>
									</li>
								)

							default:
								return null
						}
					})
				)}
				<div className="py-12" ref={messagesEndRef} />
			</ul>
			<form
				onSubmit={handleSubmit}
				className={cn('w-full flex items-center bottom-0 fixed py-8 ')}
			>
				<div
					className={cn(
						'border border-border w-11/12 md:w-8/12 mx-auto flex bg-neutral-950/90 backdrop-blur-sm px-2 py-2',
						input.split('\n').length > 1
							? 'rounded-md items-end'
							: 'rounded-full items-center'
					)}
				>
					<textarea
						ref={inputRef}
						disabled={status != 'ready'}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Escribe algo..."
						className={cn(
							'w-full outline-none transition-all ease-in-out duration-100 resize-none overflow-hidden pl-2',
							input.split('\n').length > 1
								? 'rounded-md min-h-20'
								: 'rounded-l-full h-8 pt-1'
						)}
						onKeyDown={handleSubmitKey}
					/>
					<Button
						disabled={status != 'ready'}
						type="submit"
						size="icon"
						className="rounded-full"
					>
						<Send />
					</Button>
				</div>
			</form>
		</section>
	)
}

export default Chat
