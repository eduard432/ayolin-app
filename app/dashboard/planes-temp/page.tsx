'use client';

import { PricingCardLanding } from "@/components/payment-card-landing";

export default function PricingPageTemp() {

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-10">Elige tu plan próximamente</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <PricingCardLanding
          title="Gratis"
          price="$0"
          description="Perfecto para comenzar"
          features={[
            "Acceso limitado",  
            "1 chatbot",
            "Soporte básico",
          ]}
          
        />

        <PricingCardLanding
          title="Pro"
          price="$100.00/mes"
          description="Funciones avanzadas"
          features={[
            "Chatbots ilimitados",
            "Soporte prioritario",
            "Analíticas avanzadas",
            "Actualizaciones Pro",
          ]}
          featured
        />

      </div>
    </section>
  );
}
