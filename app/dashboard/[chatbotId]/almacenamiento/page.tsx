'use client'

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import { useChatbot } from '@/data/chatbot/chatbot.client'

export default function AlmacenamientoPage() {
    const params = useParams()
    const chatbotId = params?.chatbotId as string
    const { data } = useChatbot(chatbotId)

    return(
        <div className='space-y-6'>
            <div>
                <h1 className='text-4xl font-semibold tracking-tight'>
                    Almacenamiento de {data && data.name}
                </h1>
                <p className='text-sm text-muted-foreground'>Uso de almacenamiento, respaldo y logs</p>
            </div>

            <Separator/>

            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>Uso de almacenamiento</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-1xl text-muted-foreground'>3.2 GB / 10 GB</span>
                        <span className='text-sm text-muted-foreground'>32% usado</span>
                    </div>
                    <Progress value={32} className='h-4 bg-muted'/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>Respalos Automaticos</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                        Tu chatbot genera respaldos automaticos cada 24 horas
                    </p>
                    <div className='flex gap-4'>
                        <Button variant="outline">Ver respaldos</Button>
                        <Button>Configurar Respaldos</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>Logs Recientes</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>Los ultimos registros de interacciones estan aqui:</p>
                    <ul className='list-disc list-inside space-y-1'>
                        <li>log-2025-06-24.json</li>
                        <li>log-2025-06-23.json</li>
                        <li>log-2025-06-22.json</li>
                        <li>log-2025-06-21.json</li>
                        <li>log-2025-06-20.json</li>
                    </ul>
                    <Button className='mt-2' variant="secondary">Ver todos los logs</Button>
                </CardContent>
            </Card>
        </div>
    )
}