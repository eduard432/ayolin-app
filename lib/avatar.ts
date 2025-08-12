export const AVATAR_COLORS = [
  "bg-red-500","bg-blue-500","bg-green-500","bg-purple-500",
  "bg-yellow-500","bg-pink-500","bg-indigo-500","bg-orange-500",
  "bg-teal-500","bg-rose-500","bg-amber-500","bg-cyan-500",
] as const

export type ColorClass = (typeof AVATAR_COLORS)[number]
