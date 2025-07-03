import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error apiVersion is safe here
  apiVersion: '2024-04-10',
})


export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature') as string

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      let email = session.customer_email

      if (!email && session.customer) {
        const customer = await stripe.customers.retrieve(session.customer.toString()) as Stripe.Customer
        email = customer.email ?? null
      }

      if (!email) {
        return new NextResponse('Email no encontrado', { status: 400 })
      }

      await db.user.update({
        where: { email },
        data: {
          isPro: true,
          role: 'PRO', 
        },
      })

    }

    return NextResponse.json({ received: true })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 })
  }
}
