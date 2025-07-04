"use client"

import { useState, useTransition, useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function GeneralSettings() {
  const { data: session} = useSession()
  const [ imageUrl, setImageUrl] = useState(session?.user?.image || "")
  const [isPending, startTransition] = useTransition()
  const [userInfo, setUserInfo] = useState<{email: string; role: string} | null>(null)

  useEffect(() => {
    if(!session?.user?.email) return 
  

    const fetchUserInfo = async () => {
      const res = await fetch("/api/user/info", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: session?.user.email})
      })

      const data = await res.json()
      if(res.ok){
        setUserInfo(data)
      }
    }

    fetchUserInfo()
  },  [session?.user?.email])

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await fetch("/api/upload-avatar", {
        method: "POST", 
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({image: imageUrl}),
        credentials: "include",

      })

      if(res.ok){ 
        toast.success("Foto actualizada")
      } else {
        toast.error("Error al actualizar la foto")
      }
    })
  }
  return (
    <div className="space-y-8 mb-16">
      <h1 className="text-4xl font-bold text-black mt-5">Cuenta</h1>

      <div className="grid md:grid-cols-1 gap-6">
        <Card className="bg-white border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">Nombre del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-name" className="text-black">Este es el nombre visible de tu proyecto.</Label>
            <Input id="team-name" placeholder="ej. Proyectos Ayolin" className="mt-5 w-[400px]" />
            <p className="text-sm text-black mt-2 ">Máximo 32 caracteres.</p>
            <Button className="mt-4 bg-stone-200 text-black text-1xl border-t-amber-200">Guardar</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">Correo de la cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-name" className="text-sm">Este es el correo de esta cuenta.</Label>
            <p className="font-bold mt-5 text-1xl">{userInfo?.email || "Cargando..."}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-url" className="text-black mb-4">Cambia tu foto de perfil.</Label>

            <div className="flex items-center gap-4">
              <Image
                src= {imageUrl || "https://github.com/shadcn.png"}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full border border-neutral-300"
              />
              <Input
                id="avatar-url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-[3000px]"
              />
            </div>
            <Button 
              className="mt-4 bg-stone-200 text-black text-1xl"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">Tipo de cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-name" className="text-sm">Esta cuenta es</Label>
            <p className="font-bold mt-5 text-2xl">{userInfo?.role || "Cargando..."}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
