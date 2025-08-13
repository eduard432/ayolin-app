'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardLandingProps {
	title: string
	price: string
	description: string
	features: string[]
	featured?: boolean
}

export const PricingCardDashboard = ({
	title,
	price,
	description,
	features,
	featured = false,
}: PricingCardLandingProps) => {
	return (
		<Card
			className={cn(
				'w-[350px] h-[390px] flex flex-col justify-between rounded-xl p-6 transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-lg border',
				// Fondo y bordes adaptativos
				'bg-white/70 border-gray-200 text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-white',
				featured &&
					'bg-gradient-to-b from-blue-200/40 to-purple-200/40 border-blue-300/60 dark:from-blue-600/30 dark:to-purple-600/30 dark:border-blue-400/40'
			)}
		>
			<CardHeader className="space-y-2 text-center">
				<CardTitle
					className={cn(
						'text-3xl font-bold',
						'text-gray-800 dark:text-white',
						featured && 'text-blue-700 dark:text-blue-300'
					)}
				>
					{title}
				</CardTitle>
				<p className="text-gray-600 text-sm dark:text-neutral-400">
					{description}
				</p>

				<div className="mt-4">
					<div className="text-4xl font-extrabold text-gray-900 dark:text-white">
						{price}
					</div>
					<p className="text-xs text-gray-500 dark:text-neutral-500">
						Pesos Mexicanos
					</p>
				</div>
			</CardHeader>

			<CardContent className="flex-1 mt-4">
				<ul className="space-y-3">
					{features.map((feat, i) => (
						<li
							key={i}
							className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-300"
						>
							<Check className="h-4 w-4 text-green-600 dark:text-green-400" />
							<span>{feat}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
