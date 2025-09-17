import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userEmail } = body

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: userEmail,
      metadata: {
        userEmail,
      },
      line_items: [
        {
          price: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!, 
          quantity: 1,
        },
      ],
      success_url: `${process.env.AUTH_URL}/dashboard/general?checkout=success`,
      cancel_url: `${process.env.AUTH_URL}/dashboard/planes?checkout=cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe error: ", error)
    return NextResponse.json({error:"Error creando la sesión de pago" }, { status: 500 })
  }
}
