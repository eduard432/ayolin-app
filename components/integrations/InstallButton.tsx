'use client'

import { installToolFunction } from '@/actions/integrations'
import { Button } from '@/components/ui/button'
import { addTool } from '@/data/integrations.client'
import { cn } from '@/lib/utils'
import { Chatbot } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type DataMutation = {
	chatbot: Chatbot
	keyName: string
}

export const InstallToolButton = ({
	chatbot,
	keyName,
	className,
	variant,
}: {
	chatbot: Chatbot
	keyName: string
	className?: string
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
}) => {
	const router = useRouter()

	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		DataMutation,
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async (data: DataMutation) => {
			const result = await addTool({
				chatbotId: data.chatbot.id,
				keyName: data.keyName,
			})
			return result.chatbot
		},
		onError: (_, __, context) => {
			toast.error('Error adding tool')
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
					tools: [...old.tools, { keyName: newChatbot.keyName }]
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Tool added successfully')
			router.push(`/dashboard/${chatbot.id}/integraciones`)
		},
	})

	return (
		<Button
			variant={variant}
			className={cn(className)}
			onClick={() => mutation.mutate({
				chatbot,
				keyName,
			})}
			disabled={mutation.isPending}
		>
			Install T
		</Button>
	)
}

export const InstallChannelButton = ({
	chatbotId,
	keyName,
	className,
	variant,
}: {
	chatbotId: string
	keyName: string
	className?: string
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
}) => {
	const router = useRouter()

	return (
		<Button
			variant={variant}
			className={cn(className)}
			onClick={() =>
				router.push(
					`/dashboard/${chatbotId}/integraciones/${keyName}/instalar`
				)
			}
		>
			Install C
		</Button>
	)
}
