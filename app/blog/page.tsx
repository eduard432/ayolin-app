import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import NavbarBLog from "@/components/navbarBlog"

export default function BlogPage(){
    const postsDirectory = path.join(process.cwd(), "posts")
    const fileName = fs.readdirSync(postsDirectory)

    const post = fileName.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName)
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContent)

        return {
            slug : fileName.replace(".md", ""),
            title: data.title,
            excerpt: data.excerpt,
            date: data.date
        }
    })

    return(
        <>
            <NavbarBLog/>
            <section className="px-6 md:px-20 py-16 bg-black min-h-screen pt-30">
                <div className="max-w-6xl mx-auto">

                    {/* Header Blog */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Blog de AYOLIN
                    </h1>
                    <p className="text-center text-muted-foreground mt-4 mb-12 max-w-2xl mx-auto">
                        Noticias, tutoriales y guías para ayudarte a sacar el máximo de nuestras herramientas.
                    </p>

                    {/* Grid de posts */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {post.map((post => (
                            <Card
                                key={post.slug}
                                className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                <CardHeader>
                                    <CardTitle className=" text-xl">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                                    <p className="text-sm text-gray-500">{post.date}</p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-primary font-medium mt-7 inline-block hover:text-sky-400"
                                    >
                                        Leer más →
                                    </Link>
                                </CardContent>
                            </Card>
                        )))}
                    </div>
                </div>
            </section>
        </>
    )
}