"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


const Page = () => {

    const router = useRouter()

    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

    if(!isPending && !session) router.push("/")

    return (
        <>
            {isPending && <p>Loading...</p>}
            {session && <div>Dashboard Client Page</div>}
        </>
    )

}

export default Page
