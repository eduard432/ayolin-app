'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { FormEvent, KeyboardEventHandler, useRef, useState } from 'react'
import { ObjectId } from 'bson'
import ReactMarkdown from 'react-markdown'
import { Send } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type ChatProps = {
	initialMessages: UIMessage[]
	chatId: string
	className?: string
}

const Chat = ({ initialMessages, chatId, className }: ChatProps) => {
	const [input, setInput] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const { messages, sendMessage, status } = useChat({
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
	})

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
				'rounded-md border h-full border-border p-4 w-full flex flex-col justify-between gap-4 flex-1',
				className
			)}
		>
			<ul className="overflow-y-auto h-96 px-4">
				{messages.map((message) =>
					message.parts.map((part) => {
						switch (part.type) {
							case 'text':
								return (
									<li
										key={`${message.id}:${part.type}`}
										className={`my-6 flex ${
											message.role == 'user' ? 'justify-end' : 'justify-start'
										}`}
									>
										<div
											className={cn(
												'px-4 py-1 rounded-md max-w-10/12 md:max-w-2/3',
												message.role == 'user'
													? 'bg-[#e0e0e0] dark:bg-[#374151] rounded-br-none'
													: 'bg-[#f5f5f5] dark:bg-[#4b5563] rounded-bl-none'
											)}
										>
											<ReactMarkdown>{part.text}</ReactMarkdown>
										</div>
									</li>
								)

							default:
								return null
						}
					})
				)}
			</ul>
			<form
				onSubmit={handleSubmit}
				className="rounded-md border border-border w-full flex items-center"
			>
				<textarea
					ref={inputRef}
					disabled={status != 'ready'}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Escribe algo..."
					className="w-full py-2 px-4 outline-none rounded"
					onKeyDown={handleSubmitKey}
				/>
				<Button
					disabled={status != 'ready'}
					type="submit"
					size="icon"
					variant="ghost"
					className="rounded-full"
				>
					<Send />
				</Button>
			</form>
		</section>
	)
}

export default Chat
