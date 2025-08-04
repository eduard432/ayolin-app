'use client'

import { useParams } from 'next/navigation'
import CustomToolForm, { CustomToolFormSkeleton } from './CustomToolForm'
import { useChatbot } from '@/data/chatbot.client'

const CustomToolPage = () => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)

	return (
		<>
			{chatbot ? (
				<CustomToolForm chatbot={chatbot} />
			) : (
				<CustomToolFormSkeleton />
			)}
		</>
	)
}

export default CustomToolPage
