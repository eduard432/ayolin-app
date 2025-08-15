import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Condiciones y Servicios | AYOLIN",
    description: "Revisa los términos y condiciones de uso del sitio Ayolin.",
}

export default function CondicionesServiciosPage() {
    return(
        <>

            <main className="max-w-3xl mx-auto px-4 py-12 mt-20 text-white">
                <h1 className="text-3xl font-bold mb-10"> Condiciones de Servicios</h1>
                <p className="text-sm text-muted-foreground mb-4">
                    Fecha de última actualización: 17 de julio de 2025
                </p>

                <Separator className="mb-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        1. Aceptación de los Términos 
                    </h2>
                    <p>
                        Al acceder y utilizar el sitio web de Ayolin, aceptas cumplir con estas Condiciones de servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo, no uses este sitio.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        2. Uso de Plataformas 
                    </h2>
                    <p>
                        Ayolin propociona una plataforma para [describir brevemente lo que hace su plataforma]. El uso indebido de los servicios o el acceso no autorizado está prohibido
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="sapce-y-4">
                    <h2 className="text-xl font-semibold">
                        3. Cuentas de Usuarios
                    </h2>
                    <p>
                        Al crear una cuenta, aceptas propocionar información veraz. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        4. Pagos
                    </h2>
                    <p>
                        Los pagos realizados a través de la plataforma se procesan mediante Stripe. Al realizar una compra, aceptas los términos de Stripe además de los nuestros.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        5. Cancelaciones y Reembolsos
                    </h2>
                    <p>
                        Las políticas de reembolso o cancelación se encuentran detalladas en las secciones correspondientes del sitio. Contáctanos para más información.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        6. Propiedad Intelectual
                    </h2>
                    <p>
                        Todo el contenido de Ayolin, incluyendo logos, textos, código y diseño, está protegido por derechos de autor. No se permite su uso sin autorización previa.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        7. Modificaciones
                    </h2>
                    <p>
                        Podemos modificar estos términos en cualquier momento. Te notificaremos de los cambios relevantes a través del sitio o por correo electrónico.
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        8. Contacto
                    </h2>
                    <p>
                        Si tienes preguntas sobre estas condiciones, escríbenos a:{" "}
                        <a href="mailto:ayolintm@gmail.com" className="text-cyan-500 underline">ayolintm@gmail.com</a>
                    </p>
                </section>
                
            </main>
        </>
    )
}