"use client"

import { BackButton } from '@/components/BackButton'
import { SearchBar } from '@/components/SearchBar'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const templates = [
	'Use Case',
	'Framework',
	'CSS',
	'Database',
	'CMS',
	'Authentication',
]

const Page = () => {

	const router = useRouter()

	return (
		<div className="grid grid-cols-12 px-40 gap-8 gap-x-8">
			<div className="col-span-12" >
				<BackButton href="/dashboard/nuevo" />
			</div>
			<section className="col-span-12">
				<h2 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
					Select a template.
				</h2>
				<p className="mt-2 text-sm text-neutral-600">
					Jumpstart your app development process with pre-built solutions from
					Ayolin and our comunity
				</p>
			</section>
			<section className="col-span-3">
				<div>
					<p className="font-semibold">Filter Templates</p>
					<SearchBar className="mt-2 h-8" />
				</div>
				<Separator className="mt-4" />
				<Accordion type="single" collapsible>
					{templates.map((template) => (
						<AccordionItem key={template} value={template}>
							<AccordionTrigger>{template}</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
			<section className="col-span-9 grid grid-cols-3 gap-6">
				{[...new Array(9)].map((_, i) => (
					<Card key={i} className="pt-0 justify-start">
						<AspectRatio
							ratio={16 / 9}
							className="bg-muted rounded-lg rounded-b-none cursor-pointer"
							onClick={() => router.push(`/dashboard/plantillas/plantia-test`)}
						>
							<Image
								src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
								alt="Photo by Drew Beamer"
								fill
								className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
							/>
						</AspectRatio>
						<CardContent>
							<p className="font-semibold">Template title</p>
							<p className="text-sm text-neutral-600">
								Descripción de la plantilla
							</p>
							<div className="flex justify-between text-xs mt-4 text-neutral-600">
								<p>By Ayolin</p>
								<Link href="/" >
									<MessageSquare className="w-4 h-4 " />
								</Link>
							</div>
						</CardContent>
					</Card>
				))}
			</section>
		</div>
	)
}

export default Page
