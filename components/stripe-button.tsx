// components/PayWithStripe.tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

export function PayWithStripe( {...props } : React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> ) {
  return (
    <Button { ...props } asChild>
      <a href="https://buy.stripe.com/test_bJe3cu4asdmfapm9tcejK00" target="_blank" rel="noopener noreferrer">
        Unete
      </a>
    </Button>
  )
}

