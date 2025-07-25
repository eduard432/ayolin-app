import { stripe } from "@/lib/stripe";
import { prisma } from '@/lib/prisma'
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request){
    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') as string

    let event
    try{
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        console.error('Webhook Error', err)
        return new NextResponse('Webhook Error', {status: 400})
    }

    if(event.type === 'customer.subscription.deleted'){
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await prisma.user.updateMany({
            where: {stripeCustomerId: customerId },
            data: { isPro: false, role: 'FREE'},
        })
    }

    if(event.type === 'checkout.session.completed'){
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const userEmail = (session.customer_email as string) || (session.metadata?.userEmail as string)
        
        if(!userEmail || !customerId){
            console.error("No se pudo obtener el email o customer id")
            return new NextResponse("Missing info", {status: 400})
        }

        await prisma.user.updateMany({
            where: {email: userEmail},
            data: {
                isPro: true,
                role: 'PRO',
                stripeCustomerId: customerId,
            }
        })
    }

    return NextResponse.json({ received: true})
}