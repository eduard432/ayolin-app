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
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { MarkdownRender } from './MarkdownRender'
import { Textarea } from '../ui/textarea'

type ChatProps = {
	initialMessages: UIMessage[]
	chatId: string
	className?: string
}

const Chat = ({ initialMessages, chatId, className }: ChatProps) => {
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
		<section
			className={cn(
				'w-full',
				className
			)}
		>
			<ul className="overflow-y-auto h-[82vh] px-2 md:px-40 pt-8">
				{messages.map((message) =>
					message.parts.map((part) => {
						switch (part.type) {
							case 'text':
								return (
									<li
										key={`${message.id}:${part.type}`}
										className={cn("my-6 flex", {
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
				<div ref={messagesEndRef} />
			</ul>
			<form
				onSubmit={handleSubmit}
				className={cn("border border-border w-11/12 md:w-8/12 mx-auto flex  bg-neutral-800 mb-8 my-8 px-2 py-2", input.split('\n').length > 1 ? 'rounded-md items-end' : 'rounded-full items-center')}
			>
				<textarea
					ref={inputRef}
					disabled={status != 'ready'}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Escribe algo..."
					className={cn("w-full outline-none transition-all resize-none overflow-hidden pl-2", input.split('\n').length > 1 ? 'rounded-md min-h-20' : 'rounded-l-full h-8 pt-1')}
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
			</form>
		</section>
	)
}

export default Chat
