import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    const session = await auth()

    if(!session?.user?.email){
        return new NextResponse("Unauthorized", { status: 401})
    }

    try{
        await db.user.delete({
            where: { email: session.user.email},
        })

        return new NextResponse("User deleted", { status: 200})
    } catch(error) {
        console.error(error)

        return new NextResponse("Algo salio mal", { status: 500})
    }
}