'use client'

import { installChannel, installToolFunction } from '@/actions/integrations'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

export const InstallToolButton = ({
	className,
	variant,
}: {
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
				toast.error(result.message)
				router.push(`/dashboard/${chatbotId}/integraciones`)
			}
		})
	}

	return (
		<Button
			variant={variant}
			className={cn(className)}
			onClick={handleInstall}
			disabled={isPending}
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
				router.push(`/dashboard/${chatbotId}/integraciones/${keyName}/instalar`)
			}
		>
			Install C
		</Button>
	)
}
