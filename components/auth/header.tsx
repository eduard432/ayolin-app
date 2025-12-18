import Link from "next/link"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"], 
  weight: ["600"],
})

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link 
        href="/" 
        className={cn(
          "text-3xl font-semibold text-white hover:text-blue-300 transition-colors", 
          font.className
        )}
      >
        AYOLIN
      </Link>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}
