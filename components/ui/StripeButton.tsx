import { buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type PayWithStripeProps = {
	className?: string
} & VariantProps<typeof buttonVariants>

export function PayWithStripe({
	variant = "default",
	size = "default",
	className,
}: PayWithStripeProps) {
	const { data: session, status } = useSession()
	const isLoading = status === 'loading'
	const isPro = session?.user?.isPro

	if (isLoading || isPro) return null

	return (
		<Link 
			href="/dashboard/planes-temp" 
			className={cn(
				buttonVariants({ variant, size }),
				className
			)}
		>
				Únete
		</Link>
	)
}
