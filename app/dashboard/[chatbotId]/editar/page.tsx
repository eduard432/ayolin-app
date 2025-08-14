'use client'

import { useChatbot } from '@/data/chatbot/chatbot.client'
import { useParams } from 'next/navigation'
import React from 'react'
import EditChatbotForm from './EditChatbotForm'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const EditPage = () => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)

	return (
		<>
			{chatbot ? (
				<EditChatbotForm chatbot={chatbot} />
			) : (
				<Card className="md:w-1/2 md:mx-auto">
					<CardHeader>
						<CardTitle className="text-xl">
							<Skeleton className="h-6 w-40" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="h-4 w-60 mt-1" />
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Name input */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" /> {/* label */}
							<Skeleton className="h-10 w-full rounded-md" />
						</div>

						{/* Model select */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-28" /> {/* label */}
							<Skeleton className="h-10 w-full rounded-md" />
						</div>

						{/* Initial Prompt textarea */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-28" /> {/* label */}
							<Skeleton className="h-20 w-full rounded-md" />
						</div>

						{/* Buttons */}
						<div className="flex gap-2">
							<Skeleton className="h-10 w-24 rounded-md" />
							<Skeleton className="h-10 flex-1 rounded-md" />
						</div>
					</CardContent>
				</Card>
			)}
		</>
	)
}

export default EditPage
