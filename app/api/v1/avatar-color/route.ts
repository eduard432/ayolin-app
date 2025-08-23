export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AVATAR_COLORS } from "@/lib/avatar";

export async function PUT(req: Request){
    const session = await auth()
    if(!session?.user?.email){
        return new NextResponse("Unauthorized", {status: 401})
    }

    const { colorClass } = await req.json()

    if(colorClass !== null && !AVATAR_COLORS.includes(colorClass)){
        return new NextResponse("Color inválido", {status: 400})
    }

    await db.user.update({
        where: {email: session.user.email },
        data: { avatarColor: colorClass},
        select: {id: true},
    })

    return NextResponse.json({ ok: true})

}