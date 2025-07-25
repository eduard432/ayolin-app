"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FileSliders } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PayWithStripe } from '@/components/stripe-button'

const Page = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-0 md:px-40">
			<section className="col-span-full flex justify-between items-center flex-col md:flex-row space-y-4">
				<div>
					<h2 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
						Lets build something new.
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						To deploy a new Project, import an existing template or build from
						scratch
					</p>
				</div>
				<PayWithStripe
					className="shadow-[0_0_12px_rgba(34,211,238,0.5)] px-12 w-full md:w-auto"
				/>
			</section>
			<section className="col-span-full md:col-span-6 min-h-48 md:min-h-96">
				<Card className="h-full flex items-center justify-center">
					<CardContent className="flex flex-col gap-y-8 items-center">
						<h3 className="text-2xl font-semibold">Custom Settings</h3>
						<FileSliders className="w-12 h-12 text-neutral-600" />
						<Button asChild className="w-full" variant="outline">
							<Link href="/dashboard/nuevo/personalizado" >Start</Link>
						</Button>
					</CardContent>
				</Card>
			</section>
			<section className="col-span-full md:col-span-6 min-h-48 md:min-h-96">
				<Card className="h-full">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Clone Template
						</CardTitle>
						<CardAction>
							<Select>
								<SelectTrigger className="border-none shadow-none">
									<SelectValue placeholder="Framework" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
						</CardAction>
					</CardHeader>
					<CardContent className="grid grid-cols-2 gap-4 ">
						{[...new Array(4)].map((i) => (
							<article className="border rounded-md bg-background cursor-pointer" key={i}>
								<AspectRatio ratio={4/3} className="bg-muted rounded-lg rounded-b-none">
									<Image
										src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
										alt="Photo by Drew Beamer"
										fill
										className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale rounded-b-none"
									/>
								</AspectRatio>
                                <p className="px-4 py-2 text-sm font-semibold" >Desacripción plantilla</p>
							</article>
						))}
                        <div>
                        <Link className="text-sm font-semibold hover:underline-offset-2 hover:underline" href="/dashboard/plantillas">Browse All Templates →</Link>
                        </div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}

export default Page
