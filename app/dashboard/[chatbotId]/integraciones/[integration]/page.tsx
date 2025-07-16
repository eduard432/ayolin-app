import { InstallToolButton } from '@/components/InstallButton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getToolFunctionByKeyName } from '@/data/tools.server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({
	params,
}: {
	params: Promise<{ integration: string }>
}) => {
	const { integration } = await params
	const toolFunction = await getToolFunctionByKeyName(integration)

	if (!toolFunction) return notFound()

	return (
		<div className="grid grid-cols-12 px-44 gap-x-16 gap-y-4 pb-24">
			<section className="flex justify-between col-span-12">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 capitalize">
					{toolFunction.name}
				</h4>
				<InstallToolButton />
			</section>
			<section className="col-span-3 space-y-6">
				<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
					<Image
						src={toolFunction.imageUrl}
						alt={`Tool Function image for ${toolFunction.name}`}
						fill
						className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</AspectRatio>
				<p className="text-sm">
					Descripción de la integración resumida en una frase
				</p>
				<div>
					<h5 className="font-semibold">Category</h5>
					<Badge variant="secondary" className="bg-neutral-200">
						Analíticas
					</Badge>
				</div>
				<div>
					<h5 className="font-semibold">Installs</h5>
					<p className="text-sm">500+ installs</p>
				</div>
				<div>
					<h5 className="font-semibold">Resources</h5>
					<Button
						asChild
						variant="link"
						className="text-blue-500 text-sm px-0 block font-normal"
					>
						<Link href="/">Documentation</Link>
					</Button>
					<Button
						asChild
						variant="link"
						className="text-blue-500 text-sm px-0 block font-normal"
					>
						<Link href="/">EULA</Link>
					</Button>
					<Button
						asChild
						variant="link"
						className="text-blue-500 text-sm px-0 block font-normal"
					>
						<Link href="/">Privacy Policy</Link>
					</Button>
					<Button
						asChild
						variant="link"
						className="text-blue-500 text-sm px-0 block font-normal"
					>
						<Link href="/">Website</Link>
					</Button>
				</div>
			</section>
			<section className="col-span-9 space-y-4">
				<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
					<Image
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Photo by Drew Beamer"
						fill
						className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</AspectRatio>
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">Overview</h3>
					<p className="text-primary">{toolFunction.blogDescription}</p>
				</div>
			</section>
		</div>
	)
}

export default Page
