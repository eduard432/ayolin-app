// app/support/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, HelpCircle, AlertCircle, ShieldCheck, BookOpen } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">
      <div className="mb-8 text-center mt-4">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8" />
          Soporte Técnico
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mt-2 text-sm">
          ¿Tienes problemas o preguntas? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition w-full">
          <CardHeader className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-base">Preguntas Frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Encuentra respuestas a las dudas más comunes sobre nuestra plataforma.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition w-full">
          <CardHeader className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-500" />
            <CardTitle className="text-base">Contáctanos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Escríbenos por correo para recibir atención personalizada en menos de 24 horas.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition w-full">
          <CardHeader className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-500" />
            <CardTitle className="text-base">Chat en Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Inicia un chat en tiempo real con un miembro de nuestro equipo.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition">
          <CardHeader className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <CardTitle className="text-base">Reportar un Problema</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ¿Algo no funciona como debería? Infórmanos para solucionarlo rápido.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition">
          <CardHeader className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-500" />
            <CardTitle className="text-base">Privacidad y Seguridad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aprende cómo protegemos tu información y cómo mantener tu cuenta segura.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition">
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-base">Guías de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explora tutoriales y manuales para sacarle el máximo provecho a la plataforma.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
