import Chat from '@/components/common/Chat'
import { getChatById } from '@/data/chat/chat.server'
import { convertToUIMessages } from '@/lib/utils'
import { notFound, unauthorized } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/auth'

const ChatPage = async ({
	params,
}: {
	params: Promise<{ chatId: string }>
}) => {
	const { chatId } = await params
	const chat = await getChatById(chatId, { maxMessages: 30, chatbot: true })
	const session = await auth()

	if (!chat || !session) return notFound()

	if (chat.chatbot.userId !== session.user.id) return unauthorized()

	return (
		<Chat
			chatId={chatId}
			initialMessages={convertToUIMessages(chat.messages)}
			chatbotId={chat.chatbot.id}
		/>
	)
}

export default ChatPage
