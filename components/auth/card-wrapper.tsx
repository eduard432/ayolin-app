"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"
import { BackButton } from "./back-button"

interface CardWrapperPros {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperPros) => {
  return (
    <Card
      className={`
        w-[400px]
        bg-white/10 backdrop-blur-lg
        border border-white/20
        shadow-xl text-white
      `}
    >
      {/* Encabezado */}
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      {/* Contenido */}
      <CardContent>
        {children}
      </CardContent>

      {/* Social login */}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      {/* Botón de regreso */}
      <CardFooter className="text-white">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
