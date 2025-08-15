import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request){
    const session = await auth()
    if(!session?.user?.email){
        return new NextResponse("Unauthorized", {status: 401})
    }

    const { avatarSeed, avatarNoBg } = await req.json()

    await db.user.update({
        where: { email: session.user.email},
        data: {
            ...(typeof avatarSeed === "string" || avatarSeed === null ? { avatarSeed } : {}),
            ...(typeof avatarNoBg === "boolean" ? { avatarNoBg } : {}),
        },
        select: {id: true},
    })

    return NextResponse.json({ok: true})
}