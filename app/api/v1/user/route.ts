export const runtime = "nodejs";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function DELETE() {
    const session = await auth()

    if(!session?.user?.email){
        return new NextResponse("Unauthorized", { status: 401})
    }

    try{
        const user = await db.user.findUnique({
            where: {email: session.user.email},
        })

        if(!user){
            return new NextResponse("User not found", { status: 404})
        }

        if(user.stripeCustomerId){
            const subscriptions = await stripe.subscriptions.list({
                customer: user.stripeCustomerId,
                status: "active",
                limit:1
            })

            if(subscriptions.data.length > 0){
                await stripe.subscriptions.cancel(subscriptions.data[0].id)

            }
        }

        await db.user.delete({
            where: { email: session.user.email},
        })

        return new NextResponse("User deleted", { status: 200})

    } catch(error) {
        console.error("Error al borrar usuario", error)

        return new NextResponse("Algo salio mal", { status: 500})
    }
}