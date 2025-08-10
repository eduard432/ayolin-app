'use client'
import { integrationsData } from '@/lib/integrationsData'
import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Puzzle } from 'lucide-react'
import { cn } from '@/lib/utils'
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
							<Avatar className='w-10 h-10 ring-1 ring-blue-300/20'>
								<AvatarFallback
									className={cn(
										"w-full h-full flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400"
									)}
								>
									<Puzzle className='h-5 w-5'/>
								</AvatarFallback>
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
