import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Page = async ({
	params,
}: Readonly<{ params: Promise<{ plantilla: string }> }>) => {
	const { plantilla } = await params

	return (
		<div className="grid grid-cols-12 px-20">
			<section className="col-span-4 space-y-4 pr-12 border-r">
				<h2 className="capitalize text-5xl font-bold">
					{plantilla.replaceAll('-', ' ')}
				</h2>
        <p className="text-neutral-600 mt-6" >Plantilla resumen en una frase</p>
        <div className="flex gap-x-4" >
            <Button size="default" className="flex-1">Use</Button>
            <Button variant="outline" size="default" className="flex-1" >Chat Demo</Button>
        </div>
        <div className="divide-y" >
          {["Repository", "Frameworl", "Use Case", "CSS"].map((key, i) => 
            (<div key={i} className="flex justify-between text-neutral-600 py-1 text-sm" >
              <p className="font-semibold" >{key}</p>
              <p>Value {i}</p>
            </div>)
          )}
        </div>
			</section>
			<section className="col-span-8 pl-12 space-y-4">
        <AspectRatio ratio={4/3} className="bg-muted rounded-lg">
					<Image
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Photo by Drew Beamer"
						fill
						className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</AspectRatio>
        <div>
          <h2 className="font-semibold text-xl" >Getting Started</h2>
          <p className="text-neutral-600" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta officia repudiandae beatae sit, sed tempora aperiam mollitia quisquam dolorem. Officia expedita ullam nesciunt ad corrupti quam maxime tenetur consequatur. Cum commodi unde at temporibus quibusdam nihil, sapiente quos? Necessitatibus, atque.</p>
        </div>
      </section>
		</div>
	)
}

export default Page
