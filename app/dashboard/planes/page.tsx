// app/(landing)/pricing/page.tsx
'use client';

import { PricingCard } from "@/components/payment-card";

export default function PricingPage() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">Elige tu plan</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <PricingCard
          title="Gratis"
          price="$0"
          description="Perfecto para comenzar"
          features={[
            "Acceso limitado",
            "1 chatbot",
            "Soporte básico",
          ]}
          cta="Empieza gratis"
          link="/dashboard"
        />

        <PricingCard
          title="Pro"
          price="$9.99/mes"
          description="Funciones avanzadas"
          features={[
            "Chatbots ilimitados",
            "Soporte prioritario",
            "Analíticas avanzadas",
            "Actualizaciones Pro",
          ]}
          cta="Suscribirme"
          link="https://buy.stripe.com/test_bJe3cu4asdmfapm9tcejK00"
          featured
        />

        <PricingCard
          title="Enterprise"
          price="Custom"
          description="Para equipos y empresas"
          features={[
            "Integraciones personalizadas",
            "Soporte dedicado",
            "Onboarding 1:1",
          ]}
          cta="Contáctanos"
          link="/contact"
        />
      </div>
    </section>
  );
}
