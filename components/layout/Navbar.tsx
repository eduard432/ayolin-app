'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getAllowedNavbarRoutes, getChatbotFeatures } from '@/lib/navbarData'
import { useIsMobile } from '@/hooks/use-mobile'

// 🔹 Usa tu avatar de inicial + color
import { GeneratedAvatar } from '@/components/ui/GeneratedAvatar'
import { AVATAR_COLORS, type ColorClass } from '@/lib/avatar'

const NavbarBreadcrumb = () => {
  const pathname = usePathname()
  const params = useParams()
  const chatbotId = params.chatbotId as string | undefined
  const features = chatbotId && getChatbotFeatures(chatbotId)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Title />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="opacity-65">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-foreground" href="/dashboard/general">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        {features && (
          <>
            <BreadcrumbSeparator className="opacity-65">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground">
                {features.find((f) => f.href === pathname)?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const Title = () => (
  <h1 className="uppercase tracking-widest font-semibold text-foreground text-2xl">
    Ayolin
  </h1>
)

// type guard para estrechar a ColorClass
function isColorClass(c: unknown): c is ColorClass {
  return typeof c === 'string' && (AVATAR_COLORS as readonly string[]).includes(c)
}

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const params = useParams()
  const chatbotId = params.chatbotId as string | undefined
  const router = useRouter()

  const allowedNavbarRoutes = getAllowedNavbarRoutes(chatbotId)
  const showNavbar = allowedNavbarRoutes.includes(pathname)
  const isMobile = useIsMobile()

  // Color guardado por el usuario (o null => automático)
  const raw = session?.user?.avatarColor ?? null
  const safeColor: ColorClass | null = isColorClass(raw) ? raw : null

  // Nombre para inicial (cae a email o "U")
  const displayName = session?.user?.name || session?.user?.email || 'U'

  return (
    <nav
      className={cn(
        'pt-8 pb-2 px-8 items-center flex justify-between bg-background text-foreground',
        !showNavbar && 'bg-transparent'
      )}
    >
      {isMobile ? <Title /> : <NavbarBreadcrumb />}

      <div className="flex items-center gap-x-2">

        <Link href="/blog">
          <Button size="sm" variant="outline" className="rounded-full">
            <BookOpen />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {/* 🔹 Avatar tipo Google: inicial + color */}
              <GeneratedAvatar
                name={displayName}
                size="w-10 h-10"
                colorClass={safeColor}
              />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/configuracion/cuenta')}>
              Cuenta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/planes-temp')}>
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
