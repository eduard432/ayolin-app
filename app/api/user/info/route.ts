import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function POST(req: Request){

    const {email} = await req.json()

    if(!email){
        return NextResponse.json({error: "No se proporciono el email"}, {status:400})
    }

    const user = await prisma.user.findUnique({
        where: {email},
        select:{
            email: true,
            role: true,
        },
    })

    if(!user){
        return NextResponse.json({error: "Usuario no encontrado"}, {status:404})
    }

    return NextResponse.json(user)
}