'use client';

import { useSession } from "next-auth/react";
import { PricingCard } from "@/components/common/PaymentCard";

export default function PricingPage() {

  const { data: session } = useSession()
  const email = session?.user?.email

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
          featured
          userEmail={email ?? undefined}
        />

      </div>
    </section>
  );
}
