'use client'

import { useMessages } from '@/data/chat/chat.client'
import { useChatbot } from '@/data/chatbot/chatbot.client'
import { convertToUIMessages } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { ChatSkeleton } from '@/components/common/ChatSkeleton'
import Chat from '@/components/common/Chat'

const PruebaPage = () => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)

	const { data: initialMessages } = useMessages(chatbot?.defaultChat || '')

	return chatbot && initialMessages ? (
		<Chat
			chatId={chatbot.defaultChat}
			initialMessages={convertToUIMessages(initialMessages)}
			className="mx-auto w-full md:w-2/3"
		/>
	) : (
		<ChatSkeleton className="mx-auto w-full md:w-2/3" messageCount={3} />
	)
}

export default PruebaPage
