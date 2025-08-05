import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

interface GridPostsProps {
  slug: string
  title: string
  excerpt: string
  date: string
  index: number
}

export default function GridPosts({ slug, title, excerpt, date, index }: GridPostsProps) {
  const delay = `${index * 200}ms`

  return (
    <>
      <Card
        className="bg-gray-800 border border-blue-500/10 rounded-xl shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300"
        style={{
          opacity: 0,
          animation: `fadeIn 0.8s ease-out ${delay} forwards`,
        }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-gray-100">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4">{excerpt}</p>
          <p className="text-xs text-gray-500 mb-4">{date}</p>
          <Link
            href={`/blog/${slug}`}
            className="text-blue-400 font-medium mt-7 inline-block hover:text-blue-300"
          >
            Leer más →
          </Link>
        </CardContent>
      </Card>

      {/* Animación definida en estilo global inline */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        }}
      />
    </>
  )
}
