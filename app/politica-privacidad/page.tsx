import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import NavbarExtra from "@/components/layout/extra/NavbarWrapper";

export const metadata: Metadata = {
    title: "Politica de Privacidad | AYOLIN",
    description:"Conoce cómo recopilamos, usamos y protegemos tus datos personales en Ayolin."
}

export default function PoliticaDePrivacidadPage() {
    return(
        <>
            <NavbarExtra /> 
            <main className="max-w-3xl mx-auto px-4 py-12 mt-20 text-white">
                <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
                <p className="text-sm text-muted-foreground mb-4">
                    Fecha de última actualización: 17 de julio de 2025
                </p>
                <Separator className="mb-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        1. Información que recopilamos
                    </h2>
                    <p>
                        Cuando usas nuestro sitio web, podemos recopilar la siguiente información personal:
                    </p>
                    <ul className="list-disc list-inside pl-2">
                        <li>Nombre completo</li>
                        <li>Correro electrónico</li>
                        <li>Imagen de perfil (si das permiso)</li>
                        <li>Proveedor de autenticación (Google o GitHub)</li>
                        <li>Nombre completo</li>
                    </ul>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        2. Cómo usamos tu información
                    </h2>
                    <p>
                        Usamos tu información personal únicamente para:
                    </p>
                    <ul className="list-disc list-inside pl-2">
                        <li>Crear y gestionar tu cuenta de usuario</li>
                        <li>Permitir el acceso seguro a la plataforma</li>
                        <li>Enviarte correos relacionados con tu cuenta</li>
                        <li>Procesar pagos y servicios relacionados (por ejemplo, a través de Stripe)</li>
                    </ul>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        3. Compartimos tu información con terceros
                    </h2>
                    <p>
                        Compartimos tus datos únicamente con los siguientes servicios: 
                    </p>
                    <ul className="list-disc list-inside pl-2">
                        <li>Google y GitHub: para autenticación</li>
                        <li>Stripe: para procesar pagos</li>
                        <li>Resend: para envío de correos electrónicos</li>
                    </ul>
                    <p>Nunca vendemos tu información a terceros</p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        4. Seguridad
                    </h2>
                    <p>Tomamos medidas técnicas y organizativas razonables para proteger tu información personal. Sin embargo, ningún sistema es 100% seguro.</p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        5. Tus derechos
                    </h2>
                    <p>
                        Puedes solicitar acceso, corrección o eliminación de tus datos personales escribiéndonos a: <a href="mailto:ayolintm@gmail.com" className="text-cyan-500 underline">ayolintm@gmail.com</a>
                    </p>
                </section>

                <Separator className="my-6"/>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        6. Cambios en esta politica
                    </h2>
                    <p>
                        Nos reservamos el derecho de modificar esta política de privacidad. Los cambios serán publicados en esta misma página. Te recomendamos revisarla periodicamente.
                    </p>
                </section>

                <Separator className="my-6"/>

                <p className="text-sm text-muted-foreground">
                    Si tienes dudas, contáctanos: <a href="mailto:ayolintm@gmail.com" className="underline">ayolintm@gmail.com</a>
                </p>

        </main>
        </>
    )
}