'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'

export const Social = () => {
  const noHover = `
    hover:!bg-neutral-900 active:!bg-neutral-900
    dark:hover:!bg-neutral-900 dark:active:!bg-neutral-900
    hover:shadow-none hover:opacity-100
    transition-none
  `
  return (
    <div className="flex gap-x-2 w-full">
      <Button
        size="lg"
        type="button"
        aria-label="Iniciar sesión con Google"
        onClick={() => signIn('google', { callbackUrl: '/dashboard/general' })}
        className={`flex-1 justify-center bg-neutral-900 text-white ${noHover}`}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        type="button"
        aria-label="Iniciar sesión con GitHub"
        onClick={() => signIn('github', { callbackUrl: '/dashboard/general' })}
        className={`flex-1 justify-center bg-neutral-900 text-white ${noHover}`}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
