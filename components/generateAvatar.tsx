import { cn } from "@/lib/utils"
import { AVATAR_COLORS, type ColorClass } from "@/lib/avatar"

interface GeneratedAvatarProps {
  name?: string
  size?: string
  colorClass?: ColorClass | null
}

export const GeneratedAvatar = ({
  name = "?",
  size = "w-12 h-12",
  colorClass,
}: GeneratedAvatarProps ) => {
  const initial = name.charAt(0).toUpperCase()

  const fallbackColors = AVATAR_COLORS
  const hashed = fallbackColors[name.charCodeAt(0) % fallbackColors.length]
  const finalBg = colorClass ?? hashed

  return (
    <div 
      className={cn(
        `${size} ${finalBg} flex items-center justify-center rounded-full text-white font-bold text-lg`
      )}
      aria-label={`Avatar de ${name}`}
    >
      {initial}
    </div>
  )
}