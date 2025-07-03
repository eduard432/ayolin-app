// components/PayWithStripe.tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { useSession } from "next-auth/react"

export function PayWithStripe( {...props } : React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> ) {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isPro = session?.user?.isPro

  if(isLoading) return null
  if(isPro) return null

  return (
    <Button { ...props } asChild>
      <a 
        href="https://buy.stripe.com/test_bJe3cu4asdmfapm9tcejK00" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Unete
      </a>
    </Button>
  )
}

