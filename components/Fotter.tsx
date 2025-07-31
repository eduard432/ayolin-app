'use client'

import Link from 'next/link';
import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const icons = [
  { icon: <FaFacebookF />, link: "/not-found" },
  { icon: <FaInstagram />, link: "/not-found" },
  { icon: <FaYoutube />, link: "/not-found" },
  { icon: <FaLinkedinIn />, link: "/not-found" },
  { icon: <FaTiktok />, link: "/not-found" },
  { icon: <FaWhatsapp />, link: "/not-found" },
];

export default function Fotter() {
  return (
    <footer className="relative z-10 bg-black text-white pt-20 py-12">
        <div className="flex flex-col items-center justify-center ">
          <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12">
            {/* Columna 1 */}
            <div className="flex flex-col text-left gap-2 bg-black">
              <h2 className="mb-4 text-lg font-bold text-white">Sobre Nosotros</h2>
              <a href="/not-found" className="text-sm hover:text-blue-300">Cómo funciona</a>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Testimonios</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Carreras</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Términos del servicio</Link>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Contáctanos</h2>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Contacto</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Soporte</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Destinos</Link>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Videos</h2>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Enviar video</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Embajadores</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Agencia</Link>
            </div>

            {/* Columna 4 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Redes Sociales</h2>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Instagram</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Facebook</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">YouTube</Link>
              <Link href="/not-found" className="text-sm hover:text-blue-300">Twitter</Link>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="w-full border-t border-gray-700 mt-12 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto">
              <Link href="/" className="text-3xl font-bold text-white">
                AYOLIN
              </Link>
              <p className="text-sm text-white mb-4 md:mb-0">
                © AYOLIN 2025. Todos los derechos reservados
              </p>
              <div className="flex gap-4">
                {icons.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
