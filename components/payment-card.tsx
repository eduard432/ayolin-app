import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  link: string;
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
      className={`flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border rounded-xl p-6 ${
        featured
          ? "border-primary shadow-lg bg-gradient-to-b from-white to-neutral-100"
          : "bg-white"
      }`}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-4xl font-bold text-center">{title}</CardTitle>
        <p className="text-muted-foreground text-center">{description}</p>
        <div className="mt-4 text-4xl font-extrabold text-center">{price}</div>
        <p className='text-sm text-muted text-center'>Pesos Mexicanos</p>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="mt-4 space-y-3">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-6">
        <Button className="w-full text-base h-11" asChild>
          <a href={link} rel="noopener noreferrer">
            {cta}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
