/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const body = await req.json()
    const { image } = body

    if (!image || typeof image !== "string") {
      return new NextResponse("URL de imagen no válida", { status: 400 })
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
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
