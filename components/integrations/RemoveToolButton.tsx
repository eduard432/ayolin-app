import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Chatbot } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeTool } from '@/data/integrations.client'

type DataMutation = {
	chatbot: Chatbot
	keyName: string
}

const RemoveToolButton = ({
	chatbot,
	keyName,
}: {
	chatbot: Chatbot
	keyName: string
}) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		DataMutation,
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async (data: DataMutation) => {
			const result = await removeTool({
				chatbotId: data.chatbot.id,
				keyName: data.keyName,
			})
			return result.chatbot
		},
		onError: (_, __, context) => {
			toast.error('Error removing tool')
			queryClient.setQueryData(
				['chatbot', chatbot.id],
				context?.previousChatbot
			)
		},
		onMutate: async (newChatbot) => {
			await queryClient.cancelQueries({ queryKey: ['chatbot', chatbot.id] })

			const previousChatbot = queryClient.getQueryData<Chatbot>([
				'chatbot',
				chatbot.id,
			]) as Chatbot

			queryClient.setQueryData(['chatbot', chatbot.id], (old: Chatbot) => {
				if (!old) return old
				return {
					...old,
					tools: old.tools.filter(
						(tool) => tool.keyName !== newChatbot.keyName
					),
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Tool removed successfully')
		},
	})

	return (
		<Button
			onClick={() => mutation.mutate({ chatbot, keyName })}
			disabled={mutation.isPending}
			variant="ghost"
			className="text-destructive"
		>
			Delete
		</Button>
	)
}

export default RemoveToolButton
