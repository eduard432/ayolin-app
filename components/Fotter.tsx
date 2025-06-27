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
  { icon: <FaFacebookF />, link: "/" },
  { icon: <FaInstagram />, link: "/" },
  { icon: <FaYoutube />, link: "/" },
  { icon: <FaLinkedinIn />, link: "/" },
  { icon: <FaTiktok />, link: "/" },
  { icon: <FaWhatsapp />, link: "/" },
];

export default function Fotter() {
  return (
    <footer className="bg-neutral-900 text-white mt-5 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12">
            {/* Columna 1 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Sobre Nosotros</h2>
              <a href="/sign__up" className="text-sm hover:underline">Cómo funciona</a>
              <Link href="/" className="text-sm hover:underline">Testimonios</Link>
              <Link href="/" className="text-sm hover:underline">Carreras</Link>
              <Link href="/" className="text-sm hover:underline">Términos del servicio</Link>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Contáctanos</h2>
              <Link href="/" className="text-sm hover:underline">Contacto</Link>
              <Link href="/" className="text-sm hover:underline">Soporte</Link>
              <Link href="/" className="text-sm hover:underline">Destinos</Link>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Videos</h2>
              <Link href="/" className="text-sm hover:underline">Enviar video</Link>
              <Link href="/" className="text-sm hover:underline">Embajadores</Link>
              <Link href="/" className="text-sm hover:underline">Agencia</Link>
            </div>

            {/* Columna 4 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Redes Sociales</h2>
              <Link href="/" className="text-sm hover:underline">Instagram</Link>
              <Link href="/" className="text-sm hover:underline">Facebook</Link>
              <Link href="/" className="text-sm hover:underline">YouTube</Link>
              <Link href="/" className="text-sm hover:underline">Twitter</Link>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="w-full border-t border-gray-700 mt-12 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto">
              <Link href="/" className="text-2xl font-semibold text-white mb-4 md:mb-0">
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
                    target="_blank"
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
