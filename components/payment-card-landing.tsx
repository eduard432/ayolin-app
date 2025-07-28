'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardLandingProps {
  title: string
  price: string
  description: string
  features: string[]
  featured?: boolean
}

export const PricingCardLanding = ({
  title,
  price,
  description,
  features,
  featured = false,
}: PricingCardLandingProps) => {
  return (
    <Card
      className={cn(
        'w-[350px] flex flex-col justify-between rounded-xl p-6 transition-all duration-300 hover:scale-105 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg',
        featured && 'bg-gradient-to-b from-blue-600/30 to-purple-600/30 border-blue-400/40'
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <CardTitle
          className={cn(
            'text-3xl font-bold text-white',
            featured && 'text-blue-300'
          )}
        >
          {title}
        </CardTitle>
        <p className="text-neutral-400 text-sm">{description}</p>

        <div className="mt-4">
          <div className="text-4xl font-extrabold text-white">{price}</div>
          <p className="text-xs text-neutral-500">Pesos Mexicanos</p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 mt-4">
        <ul className="space-y-3">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
              <Check className="h-4 w-4 text-green-400" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
