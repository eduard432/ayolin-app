import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { removeToolFunction } from '@/actions/integrations'
import { Chatbot } from '@prisma/client'

const RemoveToolButton = ({chatbot, keyName}: {chatbot: Chatbot, keyName: string}) => {

	const [isPending, startTransition] = useTransition()

	const handleInstall = () => {
		startTransition(async () => {
			const result = await removeToolFunction(chatbot, keyName)
			if (result.error) {
				toast.error(result.message)
			} else {
				toast.success(result.message)
			}
		})
	}

	return (
		<Button onClick={handleInstall} disabled={isPending} variant="ghost" className="text-destructive">
			Delete
		</Button>
	)
}

export default RemoveToolButton
