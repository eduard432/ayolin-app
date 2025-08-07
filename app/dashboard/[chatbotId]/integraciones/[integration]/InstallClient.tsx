'use client'

import { InstallToolButton } from '@/components/integrations/InstallButton'
import { useChatbot } from '@/data/chatbot.client'
import React from 'react'

const InstallClient = ({
	chatbotId,
	keyName,
}: {
	chatbotId: string
	keyName: string
}) => {
	const { data: chatbot } = useChatbot(chatbotId)

	return (
		<>{chatbot && <InstallToolButton chatbot={chatbot} keyName={keyName} />}</>
	)
}

export default InstallClient
