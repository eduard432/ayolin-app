'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/referencia/ui/button'
import { signIn } from 'next-auth/react'

export const Social = () => {
	return (
		<div className="grid grid-cols-2 gap-x-2 w-full">
			<Button
			// No funciona el redireccionamiento de google
				size="lg"
				className="items-center"
				variant="outline"
				onClick={() => { signIn('google', { callbackUrl: '/dashboard', redirect: true })}}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
			// Tampoco funciona el de github jajajaj 
				size="lg"
				className="justify-center"
				variant="outline"
				onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}
