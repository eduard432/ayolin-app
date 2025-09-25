import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // ¡Importante incluir los estilos!
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

export const MarkdownRender = ({ children }: { children: string }) => {
	return (
		<ReactMarkdown
			components={{
				h1: ({ node, ...props }) => (
					<h1
						className={cn(
							'scroll-m-20 text-4xl font-extrabold tracking-tight mb-4'
						)}
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className={cn(
							'scroll-m-20 text-2xl font-semibold tracking-tight mb-3'
						)}
						{...props}
					/>
				),
				p: ({ node, ...props }) => (
					<p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
				),
				a: ({ node, ...props }) => (
					<a
						className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
						target="_blank"
						rel="noopener noreferrer"
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
				),
				ol: ({ node, ...props }) => (
					<ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="mt-6 border-l-4 border-gray-300 pl-6 italic text-gray-600"
						{...props}
					/>
				),
				code: ({ className, children, ...props }) => (
					<Card className="my-4 bg-gray-950 text-gray-100">
						<CardContent className="p-4">
							<pre className="overflow-x-auto">
								<code className={cn('text-sm', className)} {...props}>
									{children}
								</code>
							</pre>
						</CardContent>
					</Card>
				),
				strong: ({ node, ...props }) => (
					<span className="font-semibold text-foreground" {...props} />
				),
				em: ({ node, ...props }) => (
					<span className="italic text-foreground/80" {...props} />
				)
			}}
			remarkPlugins={[remarkMath]}
			rehypePlugins={[rehypeKatex]}
		>
			{children}
		</ReactMarkdown>
	)
}
