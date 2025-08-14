import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUser } from '@/data/user/user.client'
import { Bot, DollarSign } from 'lucide-react'
import { Session } from 'next-auth'
import React from 'react'

export const UsageSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Card: Uso de créditos */}
      <Card className="block">
        <CardHeader className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" /> {/* Título */}
          <Skeleton className="h-5 w-5 rounded-full" /> {/* Icono */}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <Skeleton className="h-8 w-28" /> {/* Número principal */}
            <Skeleton className="h-4 w-20" /> {/* Máximo */}
          </div>
        </CardContent>
      </Card>

      {/* Card: Uso de chatbots */}
      <Card className="block">
        <CardHeader className="flex justify-between items-center">
          <Skeleton className="h-4 w-28" /> {/* Título */}
          <Skeleton className="h-5 w-5 rounded-full" /> {/* Icono */}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <Skeleton className="h-9 w-20" /> {/* Número principal */}
            <Skeleton className="h-4 w-12" /> {/* Máximo */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Usage = ({
	session,
	chatbots = 0,
}: {
	session: Session
	chatbots: number
}) => {
	const { data: user } = useGetUser(session.user.id)

	return (
		<>
			{user ? (
				<div className="space-y-4">
					<Card className="block">
						<CardHeader>
							<CardTitle className="text-muted-foreground text-sm">
								Uso de creditos
							</CardTitle>
                            <CardAction className="text-muted-foreground" >
                                <DollarSign />
                            </CardAction>
						</CardHeader>
						<CardContent>
							<p className="font-semibold text-3xl font-mono">
								{new Intl.NumberFormat('en-MX', {
									style: 'currency',
									currency: 'MXN',
									maximumFractionDigits: 2,
								}).format(user.creditUsage * 20)}
								<span className="text-sm text-muted-foreground">
									/
									{new Intl.NumberFormat('en-MX', {
										style: 'currency',
										currency: 'MXN',
										maximumFractionDigits: 2,
									}).format(user.maxCreditUsage * 20)}
								</span>
							</p>
						</CardContent>
					</Card>
					<Card className="block">
						<CardHeader>
							<CardTitle className="text-muted-foreground text-sm">
								Uso de chatbots
							</CardTitle>
                            <CardAction className="text-muted-foreground" >
                                <Bot />
                            </CardAction>
						</CardHeader>
						<CardContent>
							<p className="font-semibold text-4xl font-mono">
								{chatbots}
								<span className="text-sm text-muted-foreground">
									/{user.maxChatbots}
								</span>
							</p>
						</CardContent>
					</Card>
				</div>
			): (<UsageSkeleton />)}
		</>
	)
}

export default Usage
