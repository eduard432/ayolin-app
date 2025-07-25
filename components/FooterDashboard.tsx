import Link from 'next/link'
import React from 'react'
import ToggleTheme from './ToggleTheme'

const FooterDashboard = () => {
	return (
		<footer className="py-8 px-8 md:px-40 bg-background border-border border-t flex flex-col md:flex-row justify-between items-center space-y-4">
			<section className="w-full" >
				<h2 className="uppercase tracking-widest font-semibold text-foreground text-2xl">
					Ayolin
				</h2>
				<div className="space-x-4 text-sm text-muted-foreground mt-4">
					<Link href="/">Home</Link>
					<Link href="/docs">Docs</Link>
					<Link href="/guides">Guides</Link>
					<Link href="/help">Help</Link>
					<Link href="/contact">Contact</Link>
					<Link href="/legal">Legal</Link>
				</div>
			</section>
			<section className="flex gap-x-4 w-full justify-between md:justify-end" >
				<p className="text-sm text-blue-500">All systems normal</p>
			<ToggleTheme />
			</section>
		</footer>
	)
}

export default FooterDashboard
