'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function GeneralSettings() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground mt-5">General</h1>

      <div className="grid md:grid-cols-1 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-foreground text-2xl">Nombre del Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-name" className="text-foreground">Este es el nombre visible de tu equipo.</Label>
            <Input id="team-name" placeholder="ej. Proyectos Ayolin" className="mt-5 w-[400px]" />
            <p className="text-sm text-foreground mt-2 ">Máximo 32 caracteres.</p>
            <Button className="mt-4 bg-stone-200 text-black text-1xl">Guardar</Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-foreground text-2xl">URL del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-url" className="text-foreground">Este es el namespace de tu equipo en la plataforma.</Label>
            <div className="flex items-center mt-2">
              <span className="bg-neutral-600 px-3 py-2 rounded-l text-sm text-white mt-5">ayolin.com/</span>
              <Input id="team-url" className="rounded-l-none mt-5 w-[400px]" placeholder="ayolin-projects" />
            </div>
            <Button className="mt-4 bg-stone-200 text-black text-1xl">Guardar</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
