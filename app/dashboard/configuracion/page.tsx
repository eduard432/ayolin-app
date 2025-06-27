// app/configuracion/page.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function GeneralSettings() {
  return (
    <div className="space-y-8 pb-11">
      <h1 className="text-4xl font-bold text-black mt-5">General</h1>

      <div className="grid md:grid-cols-1 gap-6">
        <Card className="bg-white border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">Nombre del Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-name" className="text-black">Este es el nombre visible de tu equipo.</Label>
            <Input id="team-name" placeholder="ej. Proyectos Ayolin" className="mt-5 w-[400px]" />
            <p className="text-sm text-black mt-2 ">Máximo 32 caracteres.</p>
            <Button className="mt-4 bg-stone-200 text-black text-1xl border-t-amber-200">Guardar</Button>
          </CardContent>
        </Card>

        <Card className="bg-neutral-100 border-neutral-300">
          <CardHeader>
            <CardTitle className="text-black text-2xl">URL del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="team-url" className="text-black">Este es el namespace de tu equipo en la plataforma.</Label>
            <div className="flex items-center mt-2">
              <span className="bg-neutral-600 px-3 py-2 rounded-l text-sm text-white mt-5">ayolin.com/</span>
              <Input id="team-url" className="rounded-l-none mt-5 w-[400px]" placeholder="ayolin-projects" />
            </div>
            <Button className="mt-4 bg-stone-200 text-black text-1xl">Guardar</Button>
          </CardContent>
        </Card>

        <Card className="bg-neutral-100 border-neutral-300">
        <CardHeader>
            <CardTitle className="text-black text-2xl">Nombre del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
            <Label htmlFor="team-name" className="text-black">Este es el nombre visible de tu equipo en la plataforma.</Label>
            <Input id="team-name" className="mt-5 w-[400px]" placeholder="Ej. Proyectos Ayolin" />
            <Button className="mt-4 bg-stone-200 text-black text-1xl">Guardar</Button>
        </CardContent>
        </Card>

        <Card className="bg-neutral-100 border-neutral-300">
        <CardHeader>
            <CardTitle className="text-black text-2xl">Correo de contacto</CardTitle>
        </CardHeader>
        <CardContent>
            <Label htmlFor="contact-email" className="text-black">Este correo será usado para notificaciones y soporte.</Label>
            <Input id="contact-email" type="email" className="mt-5 w-[400px]" placeholder="contacto@ayolin.com" />
            <Button className="mt-4 bg-stone-200 text-black text-1xl">Guardar</Button>
        </CardContent>
        </Card>


      </div>
    </div>
  )
}
