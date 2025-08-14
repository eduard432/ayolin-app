'use client'

import { getMessages } from '@/data/chat/chat.client'
import { getChatbot } from '@/data/chatbot/chatbot.client'
import { convertToUIMessages } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Chat from '@/components/Chat'
import { ChatSkeleton } from '@/components/ChatSkeleton'

const PruebaPage = () => {

	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useQuery({
		queryKey: ['chatbot', chatbotId],
		queryFn: () => getChatbot(chatbotId),
		refetchOnWindowFocus: false,
	})

	const { data: initialMessages } = useQuery({
		queryKey: ['chatbot', chatbot?.id, 'messages'],
		queryFn: () => getMessages(chatbot?.defaultChat || ''),
		enabled: !!chatbot?.id,
		refetchOnWindowFocus: false,
	})

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
