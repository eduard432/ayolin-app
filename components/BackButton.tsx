import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MoveLeft } from 'lucide-react'

export const BackButton = ({ className, href }: React.ComponentProps<'a'>) => {
	return (
		<Button variant="ghost" className={cn('text-neutral-600', className)}>
			<Link className="flex items-center gap-x-2" href={href || '/'}><MoveLeft /> Back</Link>
		</Button>
	)
}
