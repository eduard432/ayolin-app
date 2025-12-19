import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) redirect("/")

	return <div>Dashboard Server Page</div>
}

export default Page
