export const AVATAR_COLORS = [
  // Rojos / Rosas
  "bg-red-500",
  "bg-rose-500",
  "bg-pink-500",

  // Morados / Violetas
  "bg-purple-500",
  "bg-indigo-500",

  // Azules
  "bg-blue-500",
  "bg-cyan-500",

  // Verdes
  "bg-teal-500",
  "bg-green-500",

  // Amarillos / Naranjas
  "bg-yellow-500",
  "bg-amber-500",
  "bg-orange-500",

] as const

export type ColorClass = (typeof AVATAR_COLORS)[number]
