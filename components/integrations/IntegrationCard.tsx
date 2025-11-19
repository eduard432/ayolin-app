import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'

import { Skeleton } from '../ui/skeleton'

type IntegrationCardProps = {
	className?: string
	alredyInstall?: boolean
	configUrl?: string
	imageUrl?: string
	title: string
	description: string
	children?: React.ReactNode
}

export const IntegrationCardSkeleton = () => {
	return (
		<Card className="pt-0 justify-start relative">
			<CardHeader className="absolute right-20 top-4 z-10">
				<Skeleton className="h-9 w-20" />
			</CardHeader>

			<AspectRatio
				ratio={16 / 9}
				className={cn('bg-muted rounded-lg rounded-b-none')}
			>
				<Skeleton className="h-full w-full rounded-lg rounded-b-none" />
			</AspectRatio>

			<CardContent>
				<Skeleton className="h-5 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full" />
			</CardContent>
		</Card>
	)
}

export const IntegrationCard = ({
	className,
	imageUrl = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
	title,
	description,
	children,
}: IntegrationCardProps) => {
	return (
		<Card className={cn('pt-0 justify-start relative', className)}>
			{children}
			<AspectRatio className="" ratio={16 / 9}>
				<Image
					src={imageUrl}
					alt={`Tool Function image for ${''}`}
					fill
					className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
				/>
			</AspectRatio>
			<CardContent>
				<p className="font-semibold">{title}</p>
				<p className="text-sm text-neutral-600 truncate">{description}</p>
			</CardContent>
		</Card>
	)
}
