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
import { Button } from '@/referencia/ui/button'
import { FileSliders } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
	return (
		<div className="px-40 grid grid-cols-12 gap-8 pb-16">
			<section className="col-span-12 flex justify-between items-center">
				<div>
					<h2 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
						Lets build something new.
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						To deploy a new Project, import an existing template or build from
						scratch
					</p>
				</div>
				<Button
					size="lg"
					variant="outline"
					className="shadow-[0_0_12px_rgba(34,211,238,0.5)] px-12"
				>
					Get Pro
				</Button>
			</section>
			<section className="col-span-6 min-h-96">
				<Card className="h-full flex items-center justify-center hover:bg-neutral-100">
					<CardContent className="flex flex-col gap-y-8 items-center">
						<h3 className="text-2xl font-semibold">Custom Settings</h3>
						<FileSliders className="w-12 h-12 text-neutral-600" />
						<Button className="w-full" variant="outline">
							Start
						</Button>
					</CardContent>
				</Card>
			</section>
			<section className="col-span-6 min-h-96">
				<Card className="h-full hover:bg-neutral-100">
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
							<article className="border rounded-md bg-white cursor-pointer" key={i}>
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
