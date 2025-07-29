import { cn } from "@/lib/utils"

interface GeneratedAvatarProps {
  name?: string
  size?: string
}

export const GeneratedAvatar = ({ name = "?", size = "w-12 h-12" }: GeneratedAvatarProps) => {
  const initial = name.charAt(0).toUpperCase()

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ]

  const color = colors[name.charCodeAt(0) % colors.length]

  return (
    <div
      className={cn(
        `${size} ${color} flex items-center justify-center rounded-full text-white font-bold text-lg`
      )}
    >
      {initial}
    </div>
  )
}
