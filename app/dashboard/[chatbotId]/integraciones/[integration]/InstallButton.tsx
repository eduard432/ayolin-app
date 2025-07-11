'use client'

import { installToolFunction } from '@/actions/toolFunctions'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

const InstallButton = () => {
	const router = useRouter()
	const { chatbotId, integration } = useParams<{
		chatbotId: string
		integration: string
	}>()
	const [isPending, startTransition] = useTransition()

	const handleInstall = () => {
		startTransition(async () => {
			const result = await installToolFunction(
				`${chatbotId}`,
				`${integration}`
			)
			if (result.error) {
				toast.success(result.message)
			} else {
				toast.error((result.message))
				router.push(`/dashboard/${chatbotId}/integraciones`)
			}
		})
	}

	return (
		<Button onClick={handleInstall} disabled={isPending}>
			Install
		</Button>
	)
}

export default InstallButton
