'use client'

import { Button } from '@/components/ui/button'
import { useChatbot } from '@/data/chatbot/chatbot.client'
import { addTool } from '@/data/integrations/integrations.client'
import { cn } from '@/lib/utils'
import { Chatbot } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
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
					tools: [...old.tools, { keyName: newChatbot.keyName }],
				}
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Tool added successfully')
			router.push(`/dashboard/${chatbot.id}/integraciones`)
		},
	})

	if (chatbot.tools.some((tool) => tool.keyName === keyName)) {
		return (
			<Button
				variant={variant}
				className={cn(className)}
				onClick={() => router.push(`/dashboard/${chatbot.id}/integraciones`)}
				disabled={mutation.isPending}
			>
				Configurar
			</Button>
		)
	} else {
		return (
			<Button
				variant={variant}
				className={cn(className)}
				onClick={() =>
					mutation.mutate({
						chatbot,
						keyName,
					})
				}
				disabled={mutation.isPending}
			>
				Instalar
			</Button>
		)
	}
}

export const InstallChannelButton = ({
	keyName,
	className,
	variant,
	chatbotId,
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
	const { data: chatbot } = useChatbot(chatbotId)

	if (chatbot) {
		if (chatbot.channels.some((channel) => channel.keyName === keyName)) {
			return (
				<Button
					variant={variant}
					className={cn(className)}
					onClick={() => router.push(`/dashboard/${chatbot.id}/integraciones`)}
				>
					Configurar
				</Button>
			)
		} else {
			return (
				<Button
					variant={variant}
					className={cn(className)}
					onClick={() =>
						router.push(
							`/dashboard/${chatbot.id}/integraciones/${keyName}/instalar`
						)
					}
				>
					Instalar
				</Button>
			)
		}
	}
}
