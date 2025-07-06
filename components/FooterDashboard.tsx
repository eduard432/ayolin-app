import Link from 'next/link'
import React from 'react'
import ToggleTheme from './ToggleTheme'

const FooterDashboard = () => {
	return (
		<footer className="py-8 px-40 bg-background border-muted-foreground border-t flex justify-between">
			<section>
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
			<section>
				<p className="text-sm text-blue-500">All systems normal</p>
				<ToggleTheme />
			</section>
		</footer>
	)
}

export default FooterDashboard
