import React from 'react'
import { auth, signOut } from '@/auth'

const page = async () => {
	const session = await auth()
	return (
		<div className="pt-7" >
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server'

					await signOut({
						redirectTo: '/auth/login',
					})
				}}
			>
				<button className="bg-black text-white px-2 py-1 pt-7" type="submit">
					Sign Out
				</button>
			</form>
		</div>
	)
}

export default page
