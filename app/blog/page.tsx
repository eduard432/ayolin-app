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
import TituloBlog from "@/components/TituloBlog"

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileName = fs.readdirSync(postsDirectory)

  const post = fileName.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContent)

    return {
      slug: fileName.replace(".md", ""),
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
    }
  })

  return (
    <>
      <NavbarBLog />
      <section className="relative px-6 md:px-20 py-16 min-h-screen pt-30 bg-gradient-to-br from-cyan-900 from-10% via-gray-900 via-40% to-black">
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Header Blog */}
          <TituloBlog/>
          <p className="text-center text-white mt-4 mb-12 max-w-2xl mx-auto">
            Noticias, tutoriales y guías para ayudarte a sacar el máximo de nuestras herramientas.
          </p>

          {/* Grid de posts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {post.map((post) => (
              <Card
                key={post.slug}
                className="bg-gray-800 border border-blue-500/10 rounded-xl 
                           shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]
                           transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-gray-100">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                  <p className="text-xs text-gray-500 mb-4">{post.date}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-400 font-medium mt-7 inline-block hover:text-blue-300"
                  >
                    Leer más →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
