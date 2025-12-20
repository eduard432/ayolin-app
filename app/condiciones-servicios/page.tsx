import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import NavbarExtra from "@/components/layout/extra/NavbarWrapper"

export const metadata: Metadata = {
  title: "Condiciones de Servicio | AYOLIN",
  description:
    "Consulta los términos y condiciones de uso de la plataforma AYOLIN.",
}

export default function CondicionesServiciosPage() {
  return (
    <>
      <NavbarExtra />

      <main className="max-w-3xl mx-auto px-4 py-12 mt-20 text-white">
        <h1 className="text-3xl font-bold mb-6">Condiciones de Servicio</h1>

        <p className="text-sm text-muted-foreground mb-8">
          Última actualización: 20 de Diciembre de 2025
        </p>

        <Separator className="mb-8" />

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Aceptación de los Términos</h2>
          <p>
            Al acceder o utilizar AYOLIN, aceptas cumplir con estas Condiciones de
            Servicio y con nuestra Política de Privacidad. Si no estás de acuerdo
            con estos términos, por favor no utilices la Plataforma.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Descripción del Servicio</h2>
          <p>
            AYOLIN proporciona una plataforma digital que permite a los usuarios
            crear, gestionar y utilizar chatbots y herramientas basadas en
            inteligencia artificial, así como funcionalidades relacionadas con
            automatización, análisis y personalización de experiencias digitales.
          </p>
          <p>
            La Plataforma puede evolucionar con el tiempo, incorporando nuevas
            funciones o modificando las existentes sin previo aviso.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. Cuentas de Usuario</h2>
          <p>
            Para acceder a ciertas funcionalidades es necesario crear una cuenta.
            Al hacerlo, aceptas proporcionar información veraz y mantener la
            confidencialidad de tus credenciales.
          </p>
          <p>
            Eres responsable de todas las actividades que ocurran bajo tu cuenta.
            AYOLIN se reserva el derecho de suspender o cancelar cuentas que
            infrinjan estas Condiciones.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Uso Aceptable</h2>
          <p>
            Te comprometes a no utilizar la Plataforma para fines ilegales, no
            autorizados o que puedan dañar a AYOLIN, a otros usuarios o a
            terceros.
          </p>
          <p>
            Está prohibido intentar acceder sin autorización a sistemas, datos o
            cuentas, así como interferir con la seguridad o el funcionamiento del
            servicio.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            5. Inteligencia Artificial y Contenido Generado
          </h2>
          <p>
            AYOLIN utiliza sistemas de inteligencia artificial para generar
            respuestas, contenido y sugerencias. Dicho contenido puede contener
            errores o información incompleta.
          </p>
          <p>
            El contenido generado no sustituye asesoría profesional (legal,
            médica, financiera u otra). El uso de dicho contenido es bajo tu
            propia responsabilidad.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            6. Pagos, Planes y Suscripciones
          </h2>
          <p>
            Actualmente, AYOLIN es de uso gratuito y no requiere pagos ni
            suscripciones.
          </p>
          <p>
            En el futuro, podrán habilitarse planes de pago, suscripciones u
            otras modalidades comerciales. En ese caso, las condiciones,
            precios y beneficios se informarán de forma clara antes de cualquier
            cargo.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            7. Cancelaciones y Reembolsos
          </h2>
          <p>
            Mientras el servicio sea gratuito, no aplican políticas de
            reembolso. En caso de habilitarse servicios de pago en el futuro,
            dichas políticas serán comunicadas oportunamente.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">8. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de AYOLIN, incluyendo software, código, diseños,
            logotipos y textos, es propiedad de AYOLIN o de sus licenciantes y
            está protegido por las leyes de propiedad intelectual.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            9. Disponibilidad del Servicio
          </h2>
          <p>
            AYOLIN no garantiza que la Plataforma esté disponible de forma
            ininterrumpida o libre de errores. Podrán realizarse mantenimientos
            o interrupciones temporales.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            10. Limitación de Responsabilidad
          </h2>
          <p>
            En la máxima medida permitida por la ley, AYOLIN no será responsable
            por daños derivados del uso o imposibilidad de uso de la Plataforma.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 11 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            11. Modificaciones de los Términos
          </h2>
          <p>
            AYOLIN puede modificar estas Condiciones en cualquier momento. El
            uso continuado de la Plataforma implica la aceptación de los
            términos actualizados.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">12. Terminación</h2>
          <p>
            AYOLIN puede suspender o cancelar el acceso a la Plataforma si se
            detecta un incumplimiento de estas Condiciones.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 13 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">13. Legislación Aplicable</h2>
          <p>
            Estas Condiciones se rigen por las leyes aplicables del país donde
            AYOLIN tenga su sede legal.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 14 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">14. Contacto</h2>
          <p>
            Si tienes preguntas sobre estas Condiciones, puedes escribirnos a:
          </p>
          <a
            href="mailto:ayolintm@gmail.com"
            className="text-cyan-400 underline"
          >
            ayolintm@gmail.com
          </a>
        </section>
      </main>
    </>
  )
}