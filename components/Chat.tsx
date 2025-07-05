"use client"

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { FormEvent, useState } from 'react'
import { ObjectId } from 'bson'

type ChatProps = {
	initialMessages: UIMessage[]
	chatId: string
}

const Chat = ({ initialMessages, chatId }: ChatProps) => {
	const [input, setInput] = useState('')

	const { messages, sendMessage } = useChat({
		messages: initialMessages,
		generateId: () => new ObjectId().toString(),
		transport: new DefaultChatTransport({
			api: `/api/v1/chat/${chatId}`,
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

	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
			{messages.map((message) => (
				<div key={message.id} className="whitespace-pre-wrap">
					{message.role === 'user' ? 'User: ' : 'AI: '}
					{message.parts.map((part, i) => {
						switch (part.type) {
							case 'text':
								return <div key={`${message.id}-${i}`}>{part.text}</div>
						}
					})}
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<input
					className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
					value={input}
					placeholder="Say something..."
					onChange={(e) => setInput(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default Chat
