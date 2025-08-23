export const runtime = "nodejs";

import { auth } from "@/lib/auth"
import { db } from '@/lib/db'
import { NextResponse } from "next/server"

export async function PATCH(req: Request){
    try{
        const session = await auth()

        if(!session || !session.user?.id){
            return new NextResponse("No autorizado", {status: 401})
        }

        const body = await req.json()
        const { enabled } = body as {enabled: boolean}

        await db.user.update({
            where: {id: session.user.id},
            data: {isTwoFactorEnabled: enabled},
        })

        return NextResponse.json({success: true, message: `Vericicación en dos pasos ${enabled ? "activada" : "desactivada"}`})
    } catch(error){
        console.error("Error al actualizar 2FA", error)
        return new NextResponse("Error interno del servidor", {status: 500})
    }
}