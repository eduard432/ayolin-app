'use client'

import { useMemo, useState } from "react"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import  Image  from "next/image"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    CardFooter, 
    CardDescription
} from "@/components/ui/card"
import { toast } from "sonner"
import { avatarSvg, svgToDataUrl } from "@/lib/multiavatar"

const COUNT = 12

function makeSeed(base: string){
    return Array.from({length: COUNT}, (_, i) => `${base}-${i + 1}-${crypto.randomUUID().slice(0, 6)}`)
}

export default function AvatarPicker({
    userId, 
    currentSeed,
    noBg = true,
    onSaved
}: {
    userId: string
    currentSeed?: string | null
    noBg?: boolean
    onSaved?: (seed: string | null) => void
}) {
    const [batchId, setBatchId] = useState(() => crypto.randomUUID().slice(0,6))
    const [selected, setSelected] = useState<string>(currentSeed || `${userId}-1`)
    const seeds = useMemo(() => makeSeed(`${userId}-${batchId}`), [userId, batchId])
    const previews = useMemo(() => seeds.map(s => ({seed: s, url:svgToDataUrl(avatarSvg(s, { noBg })) })), [seeds, noBg])

    const handleRegenerate = () => setBatchId(crypto.randomUUID().slice(0,6))
    const handleClear = () => setSelected('')

    const handleSave = async () => {
        const res = await fetch('/api/v1/avatar', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarSeed: selected || null, avatarNoBg: noBg}),
        })
        if(!res.ok){
            toast.error("No se pudo guardar el avatar")
            return
        }
        onSaved?.(selected || null)
        toast.success('Avatar actualizado')
    }

    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>Genera opciones y elige tu avatar. Puedes limpiar para usar la inicial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-primary/40">
                        <AvatarImage src={svgToDataUrl(avatarSvg(selected || 'fallback', {noBg}))} alt="preview" />
                        <AvatarFallback>AY</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                        <Button variant="secondary" type="button" onClick={handleRegenerate}>Regenerar</Button>
                        <Button variant="ghost" type="button" onClick={handleClear}>Quitar Avatar</Button>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-3">
                    {previews.map(({seed, url }) => (
                        <button
                            key={seed}
                            type="button"
                            onClick={() => setSelected(seed)}
                            className="h-12 w-12 rounded-full border border-border hover:scale-105 transition flex items-center justify-center"
                            title={seed}
                        >
                            <Image
                             src={url} 
                             alt={seed} 
                             width={40}
                             height={40}
                             className="h-10 w-10 rounded-full" 
                             unoptimized
                            />
                        </button>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={handleSave}>Guardad</Button>
            </CardFooter>
        </Card>
    )
}
