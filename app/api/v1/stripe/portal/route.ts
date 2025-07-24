import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST() {

    const session = await auth()
    const email = session?.user?.email

    if(!email){
        return new NextResponse('Unauthorized', {status: 401})
    }

    const user = await prisma.user.findUnique({ where: {email}})
    if(!user?.stripeCustomerId){
        return new NextResponse('No Stripe customer', {status:400})
    }

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/configuracion`, 
    })

    return NextResponse.json({ url: portalSession.url })
}