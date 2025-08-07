// components/PayWithStripe.tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function PayWithStripe( {...props } : React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> ) {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isPro = session?.user?.isPro

  if(isLoading) return null
  if(isPro) return null

  return (
    <Button {...props} asChild>
      <Link href="/dashboard/planes-temp" rel="noopener noreferrer">
        Únete
      </Link>
    </Button>

  )
}

