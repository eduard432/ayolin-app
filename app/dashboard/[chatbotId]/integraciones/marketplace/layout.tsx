import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import Link from 'next/link'
import React from 'react'
import IntegrationsNavbar from './CategoryNavbar'
import { SearchBar } from '@/components/search-bar'

const Layout = async ({
	params,
    children
}: Readonly<{
	params: Promise<{ chatbotId: string }>
    children: React.ReactNode
}>) => {
	const { chatbotId } = await params

	return (
		<div className="px-36 grid grid-cols-12 gap-x-16">
			<section className="flex justify-between col-span-12">
				<h4 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
					Integraciones
				</h4>
				<Button variant="outline" asChild>
					<Link href={`/dashboard/${chatbotId}/integraciones`}>
						Installed Integrations
					</Link>
				</Button>
			</section>
			<Separator className="bg-neutral-300 my-8 col-span-full" />
			<section className="col-span-3 flex flex-col border-none">
				<IntegrationsNavbar />
			</section>
			<section className="col-span-9">
                <SearchBar placeholder="Search integrations..." className="h-10 mb-8" />
                {children}
            </section>
		</div>
	)
}

export default Layout
