import { Card, CardHeader, CardTitle, CardContent, CardFooter} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from "lucide-react"

interface PricingCardProps{
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
} : PricingCardProps) => {

    return(
        <Card 
            className={`flex felx-col justify-between border ${
                featured ? "border-primary shadow-lg" : ""
            }`}
        >
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
                <p className='text-muted-foreground'>{description}</p>
                <div className='mt-4 text-4xl font-extrabold'>{price}</div>
            </CardHeader>
            
            <CardContent className='flex-1'>
                <ul className='mt-4 space-y-2'>
                    {features.map((feat: string, i: number) => (
                        <li key={i} className='flex items-center gap-2'>
                            <Check className='h-4 w-4 text-green-500'/>
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {cta}
          </a>
        </Button>
      </CardFooter>
        </Card>
    )
}