import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getToolFunctionByKeyName } from '@/data/tools.server'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import InstallClient from './InstallClient'

const Page = async ({
	params,
}: {
	params: Promise<{ integration: string; chatbotId: string }>
}) => {
	const { integration, chatbotId } = await params
	const toolFunction = await getToolFunctionByKeyName(integration)

	if (!toolFunction) return notFound()

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 mx-auto w-full md:w-9/12 gap-x-16 gap-y-4 pb-8">
			<section className="col-span-full">
				<Link
					className="flex items-center gap-x-2 text-muted-foreground text-sm"
					href={`/dashboard/${chatbotId}/integraciones/marketplace`}
				>
					<ArrowLeft className="h-5 w-5" /> Regresar a marketplace
				</Link>
			</section>
			<section className="flex justify-between col-span-full">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 capitalize">
					{toolFunction.name}
				</h4>
				<InstallClient keyName={toolFunction.keyName} chatbotId={chatbotId} />
			</section>
			<Separator className="col-span-full" />
			<section className="col-span-full md:col-span-3 space-y-6 hidden md:block">
				<div>
					<h5 className="font-semibold">Categoría:</h5>
					<Badge variant="secondary">Analíticas</Badge>
				</div>
				<div>
					<h5 className="font-semibold">Installs</h5>
					<p className="text-sm">500+ installs</p>
				</div>
				<div>
					<h5 className="font-semibold">Recursos</h5>
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
			<section className="col-span-full md:col-span-9 space-y-4">
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">Overview</h3>
					<p className="text-primary">{toolFunction.blogDescription}</p>
				</div>
				<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
					<Image
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Photo by Drew Beamer"
						fill
						className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</AspectRatio>
			</section>
		</div>
	)
}

export default Page
