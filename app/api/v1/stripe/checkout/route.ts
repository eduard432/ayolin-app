import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/sripe";
import { prisma } from "@/lib/prisma"

export async function POST() {
    const session = await auth()
    const email = session?.user?.email

    if(!email){
        return new NextResponse('Unauthorized', { status: 401})
    }

    const user = await prisma.user.findUnique({ 
        where: { email },
    })

    if(!user){
        return new NextResponse('Usuario no encontrado', {status: 404})
    }

    let stripeCustomerId = user.stripeCustomerId
    if(!stripeCustomerId){
        const customer = await stripe.customers.create({
            email: user.email!,
            name: user.name || '',
        })
        stripeCustomerId = customer.id
        await prisma.user.update({
            where: {id: user.id},
            data: {stripeCustomerId},
        })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer: stripeCustomerId,
        line_items: [{ price: 'price_1RgBLHCFvdHXc1SfE0aGVSzX', quantity: 1}],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancelled`, 
    })

    return NextResponse.json({ url: checkoutSession.url })
}