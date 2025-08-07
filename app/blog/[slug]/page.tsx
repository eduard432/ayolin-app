export const runtime = "nodejs"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { notFound } from "next/navigation"
import NavbarBLog from "@/components/navbarBlog"


export default async function PostPage({ params }: {params: Promise<{slug: string}>}) {
  const postsDirectory = path.join(process.cwd(), "posts")
  const slug = (await params).slug

  if (!fs.existsSync(postsDirectory)) {
    notFound()
  }

  const filePath = path.join(postsDirectory, `${slug}.md`)

  if(!fs.existsSync(filePath)){
    notFound()
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <>
      <NavbarBLog />
      <article className="px-6 md:px-20 py-16 mx-w-4xl min-h-screen mx-auto pt-40 bg-gradient-to-bl from-cyan-900 from-10% via-gray-900 via-40% to-black">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {data.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{data.date}</p>
        <div
          className="prose prose-lg prose-invert text-white text-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </>
  )
}

{/* Para evitar problemas */}
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts")

  if (!fs.existsSync(postsDirectory)) {
    return [] // Si no hay carpeta, no hay rutas
  }

  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }))
}