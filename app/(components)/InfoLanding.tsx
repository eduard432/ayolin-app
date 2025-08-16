import { MessageSquare } from "lucide-react"

export default function Info() {
  return (
    <section id="home" className="relative bg-black text-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="mt-4 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
            ¿Qué es AYOLIN?
          </h2>
        </div>

        {/* Grid principal: izquierda texto, derecha chat */}
        <div className="flex grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-20">
          {/* Columna izquierda: texto */}
          <div>
            <p className="text-neutral-300 text-lg leading-relaxed mt-20 text-center">
              Un asistente personal en tus contactos, listo para ayudarte en lo que
              necesites; <span className="text-white font-semibold">ventas</span>,{" "}
              <span className="text-white font-semibold">estudios</span>,{" "}
              <span className="text-white font-semibold">servicio al cliente</span>{" "}
              y mucho mas. Diseñado tanto para empresas como para las actividades de tu día a día.
            </p>

            <p className="mt-4 text-neutral-200 text-lg leading-relaxed text-center">
              Personalízalo según tus gustos y necesidades; agrega{" "}
              <span className="text-white font-semibold">extensiones</span> a tu ChatBot
              con las funciones que requieras.
            </p>


            {/* Nota de plataformas */}
            <p className="mt-6 text-neutral-400 text-base md:text-lg text-center">
              Ya lo puedes usar en <span className="text-white">Telegram</span>.
              Próximamente también en <span className="text-white">WhatsApp</span> y{" "}
              <span className="text-white">Discord</span>.
            </p>
          </div>

          {/* Columna derecha: mini mockup de chat */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-neutral-300 mb-5">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm">Ejemplo de Conversaciones</span>
              </div>

              {/* Mensajes */}
              <div className="space-y-3">
                {/* user */}
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/10 px-3 py-2 text-sm text-neutral-100">
                  Hola Ayolin, ¿puedes ayudarme a responder mensajes de clientes?
                </div>
                {/* bot */}
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm border border-white/10 bg-gradient-to-r from-blue-600/70 to-purple-600/70 px-3 py-2 text-sm text-white shadow-lg">
                  ¡Claro! ¿Quieres que active el flujo de soporte y etiquete consultas urgentes?
                </div>
                {/* user */}
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/10 px-3 py-2 text-sm text-neutral-100">
                  Sí, y recuerdame llevar el coche a lavar mañana.
                </div>
                {/* bot */}
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm border border-white/10 bg-gradient-to-r from-blue-600/70 to-purple-600/70 px-3 py-2 text-sm text-white shadow-lg">
                  Hecho. También puedo enviar un resumen al finalizar el día.
                </div>
              </div>

              {/* Input decorativo */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs text-neutral-400">Escribe un mensaje…</span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Separador sutil */}
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Chips a lo ancho de ambas columnas */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Telegram
          </span>
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Experto en lo que necesites
          </span>
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Servicio al cliente
          </span>
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Extensiones personalizadas
          </span>
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Vendedor
          </span>
          <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-sm text-neutral-200">
            Asistente personal
          </span>
        </div>
      </div>
    </section>
  )
}
