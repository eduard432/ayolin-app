'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  variant?: 'desktop' | 'mobile'
}

export default function LegalLinks({ variant = 'desktop' }: Props) {
  const pathname = usePathname() || ''
  const onCondiciones = pathname.startsWith('/condiciones-servicios')
  const onPrivacidad = pathname.startsWith('/politica-privacidad')

  const itemClass =
    variant === 'desktop'
      ? 'text-white hover:text-blue-300'
      : 'block hover:text-blue-300 text-2xl'

  // Si está en condiciones-servicios, mostrar link a política-privacidad
  if (onCondiciones) {
    return (
      <li>
        <Link href="/politica-privacidad" className={itemClass}>
          Política de privacidad
        </Link>
      </li>
    )
  }

  // Si está en política-privacidad, mostrar link a condiciones-servicios
  if (onPrivacidad) {
    return (
      <li>
        <Link href="/condiciones-servicios" className={itemClass}>
          Condiciones de servicio
        </Link>
      </li>
    )
  }
}

