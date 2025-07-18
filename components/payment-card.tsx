import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  featured?: boolean
  link: string
}

export const PricingCard = ({
  title,
  price,
  description,
  features,
  cta,
  featured = false,
  link,
}: PricingCardProps) => {
  return (
    <Card
      className={cn(
        'w-[400px] flex flex-col justify-between border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
        featured
          ? 'border-primary bg-gradient-to-b from-background to-muted shadow-lg'
          : 'bg-background'
      )}
    >
      <CardHeader className="space-y-2">
        <CardTitle
          className={cn(
            'text-3xl font-bold text-center',
            featured && 'text-primary'
          )}
        >
          {title}
        </CardTitle>
        <p className="text-muted-foreground text-center text-sm">{description}</p>

        <div className="mt-4 text-center">
          <div className="text-4xl font-extrabold">{price}</div>
          <p className="text-sm text-muted-foreground">Pesos Mexicanos</p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 mt-4">
        <ul className="space-y-3">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-6">
        <Button
          variant={featured ? 'default' : 'outline'}
          className={cn('w-full text-base h-11')}
          asChild
        >
          <a href={link} rel="noopener noreferrer">
            {cta}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
