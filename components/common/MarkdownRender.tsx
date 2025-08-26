import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // ¡Importante incluir los estilos!

export const MarkdownRender = ({ children }: { children: string }) => {
	return (
		<ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
			{children}
		</ReactMarkdown>
	)
}
