'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'

export const Social = () => {
	return (
		<div className="flex gap-x-2 w-full">
			<Button
			// No funciona el redireccionamiento de google
				size="lg"
				className="items-center flex-1"
				variant="outline"
				type='button'
				onClick={() => signIn('google', { callbackUrl: '/', redirect: true, basePath: '/api/v1/auth' })}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
			// Tampoco funciona el de github jajajaj 
				size="lg"
				className="justify-center flex-1"
				variant="outline"
				type='button'
				onClick={() => signIn('github', { callbackUrl: '/', redirect: true, basePath: '/api/v1/auth' })}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}
