'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/referencia/ui/button'

export const Social = () => {
	return (
		<div className="grid grid-cols-2 gap-x-2 w-full">
			<Button
				size="lg"
				className="items-center"
				variant="outline"
				onClick={() => {}}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
				size="lg"
				className="justify-center"
				variant="outline"
				onClick={() => {}}
			>
				<FaGithub className="h-5 w-5" />
			</Button>
		</div>
	)
}
