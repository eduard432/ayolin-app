'use client'

import { useEffect, useState } from 'react'
import NavbarAnimated from './NavbarAnimated'

export default function NavbarWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null 

  return <NavbarAnimated />
}
