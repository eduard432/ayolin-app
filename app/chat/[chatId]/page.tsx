import Chat from '@/components/common/Chat'
import { getMessagesByChatId } from '@/data/chat/chat.server'
import { convertToUIMessages } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React from 'react'

const ChatPage = async ({
	params,
}: {
	params: Promise<{ chatId: string }>
}) => {
	const { chatId } = await params
	const messages = await getMessagesByChatId(chatId)

	if (!messages) return notFound()

	return (
		<Chat chatId={chatId} initialMessages={convertToUIMessages(messages)} />
	)
}

export default ChatPage
