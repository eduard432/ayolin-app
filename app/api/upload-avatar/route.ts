import { auth } from "@/lib/auth" // No se por que esta marcando error
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import type { Session } from "next-auth"

export async function POST(req: Request) {
  try {
    const session = await auth()

    const userSession = session as unknown as Session
    if (!userSession?.user?.id) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const body = await req.json()
    const { image } = body

    if (!image || typeof image !== "string") {
      return new NextResponse("URL de imagen no válida", { status: 400 })
    }

    const updatedUser = await db.user.update({
      where: { id: userSession.user.id },
      data: { image },
    })

    return NextResponse.json({
      message: "Avatar actualizado",
      user: {
        id: updatedUser.id,
        image: updatedUser.image,
      },
    })
  } catch (error) {
    console.error("Error al subir avatar:", error)
    return new NextResponse("Error interno del servidor", { status: 500 })
  }
}
