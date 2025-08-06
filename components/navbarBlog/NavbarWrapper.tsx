'use client'

import { useEffect, useState } from 'react'
import NavbarAnimated from './NavbarAnimated'
import NavbarBase from './NavbarBase'

export default function NavbarWrapper() {
  const [hasJS, setHasJS] = useState(false)

  useEffect(() => {
    setHasJS(true)
  }, [])

  return hasJS ? <NavbarAnimated /> : <NavbarBase />
}
