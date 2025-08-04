import fs from "fs"
import path from "path"
import matter from "gray-matter"
import NavbarBLog from "@/components/navbarBlog"
import TituloBlog from "@/components/TituloBlog"
import GridPosts from "@/components/GridPosts"

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
      <section className="relative px-6 md:px-20 py-16 min-h-screen pt-40 bg-gradient-to-br from-cyan-900 from-10% via-gray-900 via-40% to-black">
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Header Blog */}
          <TituloBlog/>

          {/* Grid de posts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-10">
            {post.map((post, index) => (
              <GridPosts
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
