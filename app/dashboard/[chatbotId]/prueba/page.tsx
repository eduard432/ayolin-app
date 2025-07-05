'use client'

import { getMessages } from '@/data/chat.client'
import { getChatbot } from '@/data/chatbot.client'
import { convertToUIMessages } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Chat from '@/components/Chat'

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
		/>
	) : (
		<p>Loading...</p>
	)
}

export default PruebaPage
