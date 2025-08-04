import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { notFound } from "next/navigation"
import NavbarBLog from "@/components/navbarBlog"

interface PostPageProps {
    params: {slug: string}
}

export default async function PostPage({ params }: PostPageProps){
    const postsDirectory = path.join(process.cwd(), "posts")
    const filePath = path.join(postsDirectory, `${params.slug}.md`)

    if(!fs.existsSync(filePath)){
        return notFound()
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    const processContent = await remark().use(html).process(content)
    const contentHtml = processContent.toString()

    return (
        <>
            <NavbarBLog showBackButton/>
            <article className="px-6 md:px-20 py-16 mx-w-4xl min-h-screen mx-auto pt-40 bg-gradient-to-bl from-cyan-900 from-10% via-gray-900 via-40% to-black">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    {data.title}
                </h1>
                <p className="text-sm text-muted-foreground mb-8">{data.date}</p>

                <div className="prose prose-lg prose-invert text-white text-lg" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </>
    )
}