import EjemploConversacion from "@/components/common/EjemploConversacion"

export default function Info() {
  return (
    <section id="home" className="relative bg-black text-white pt-16 md:py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
            ¿Qué es AYOLIN?
          </h2>
        </div>

        {/* Para hacer las dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda (Texto) */}
          <div className="text-center lg:text-left max-w-2xl mx-auto mt-9">
            <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
              Un asistente personal en tus contactos, listo para ayudarte en lo que
              necesites: <span className="text-white font-semibold">ventas</span>,{" "}
              <span className="text-white font-semibold">estudios</span>,{" "}
              <span className="text-white font-semibold">servicio al cliente</span>{" "}
              y mucho más. Diseñado tanto para empresas como para las actividades de tu día a día.
            </p>

            <p className="mt-4 text-neutral-200 text-lg leading-relaxed">
              Personalízalo según tus gustos y necesidades; agrega{" "}
              <span className="text-white font-semibold">extensiones</span> a tu ChatBot
              con las funciones que requieras.
            </p>

            <p className="mt-6 text-neutral-400 text-base md:text-lg">
              Ya lo puedes usar en <span className="text-white">Telegram</span>.
              Próximamente también en <span className="text-white">WhatsApp</span> y{" "}
              <span className="text-white">Discord</span>.
            </p>
          </div>

          {/* Columna derecha (Caja de mensajes de ejemplo) */}
          <EjemploConversacion/>
          
        </div>

      </div>
    </section>
  )
}
