"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href: string
  label: string
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link", size: "sm" }),
        "font-normal w-full text-white"
      )}
    >
      {label}
    </Link>
  )
}