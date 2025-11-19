'use client'

import { useChatbot } from '@/data/chatbot/chatbot.client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const PruebaPage = () => {
	const params = useParams()
  const chatbotId = params?.chatbotId as string
  const { data: chatbot } = useChatbot(chatbotId)
  const router = useRouter()

  useEffect(() => {
    if (chatbot?.defaultChat) {
      router.replace(`/chat/${chatbot.defaultChat}`)
    }
  }, [chatbot, router])

  return null // mientras redirige no mostramos nada
}

export default PruebaPage
