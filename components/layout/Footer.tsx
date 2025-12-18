import Link from "next/link"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from "@tabler/icons-react"

const icons = [
  { Icon: IconBrandFacebook, label: "Facebook", href: "/not-found" },
  { Icon: IconBrandInstagram, label: "Instagram", href: "/not-found" },
  { Icon: IconBrandYoutube, label: "YouTube", href: "/not-found" },
  { Icon: IconBrandLinkedin, label: "LinkedIn", href: "/not-found" },
  { Icon: IconBrandTiktok, label: "TikTok", href: "/not-found" },
  { Icon: IconBrandWhatsapp, label: "WhatsApp", href: "/not-found" },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-white pt-20 py-12">
      <div className="flex flex-col items-center justify-center">
        {/* Columnas */}
        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12">
          <div className="flex flex-col text-left gap-2">
            <h2 className="mb-4 text-lg font-bold">Sobre Nosotros</h2>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Cómo funciona</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Testimonios</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Carreras</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Términos del servicio</Link>
          </div>

          <div className="flex flex-col text-left gap-2">
            <h2 className="mb-4 text-lg font-bold">Contáctanos</h2>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Contacto</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Soporte</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Destinos</Link>
          </div>

          <div className="flex flex-col text-left gap-2">
            <h2 className="mb-4 text-lg font-bold">Videos</h2>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Enviar video</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Embajadores</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Agencia</Link>
          </div>

          <div className="flex flex-col text-left gap-2">
            <h2 className="mb-4 text-lg font-bold">Redes Sociales</h2>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Instagram</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Facebook</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">YouTube</Link>
            <Link href="/not-found" className="text-sm hover:text-blue-300">Twitter</Link>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full border-t border-gray-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto">
            <Link href="/" className="text-3xl font-bold">
              AYOLIN
            </Link>

            <p className="text-sm mb-4 md:mb-0">
              © AYOLIN 2025. Todos los derechos reservados
            </p>

            <div className="flex gap-4">
              {icons.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}