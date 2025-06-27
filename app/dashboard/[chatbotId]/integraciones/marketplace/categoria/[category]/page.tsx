'use client'
import { integrationsData } from '@/lib/integrationsData'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
	const router = useRouter()
	const params = useParams() as { category: string; chatbotId: string }

	return (
		<div>
			{integrationsData[params.category].map((integration) => (
				<Card
					onClick={() =>
						router.push(
							`/dashboard/${params.chatbotId}/integraciones/${integration.name.toLowerCase()}`
						)
					}
					key={integration.name}
					className="first:rounded-t-md last:rounded-b-md rounded-none py-4 cursor-pointer"
				>
					<CardContent className="flex justify-between items-center">
						<div className="flex items-center gap-x-4">
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<h4 className="font-medium">{integration.name}</h4>
								<p className="text-sm font-medium text-neutral-500">
									{integration.description}
								</p>
							</div>
						</div>
						<Button variant="outline">
							{integration.action ? integration.action : 'Manage'}
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

export default Page
