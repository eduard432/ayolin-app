// app/(landing)/pricing/page.tsx
'use client';

import { PricingCard } from "@/components/payment-card";

export default function PricingPage() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-10">Elige tu plan</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <PricingCard
          title="Gratis"
          price="$0"
          description="Perfecto para comenzar"
          features={[
            "Acceso limitado",
            "1 chatbot",
            "Soporte básico",
          ]}
          cta="Plan actual"
          link="/dashboard/general"
        />

        <PricingCard
          title="Pro"
          price="$100.00/mes"
          description="Funciones avanzadas"
          features={[
            "Chatbots ilimitados",
            "Soporte prioritario",
            "Analíticas avanzadas",
            "Actualizaciones Pro",
          ]}
          cta="Suscribirme"
          link="https://buy.stripe.com/test_bJe3cu4asdmfapm9tcejK00"
        />

      </div>
    </section>
  );
}
