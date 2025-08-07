'use client';

import { PricingCardDashboard } from "@/components/payment-card-dashboard";

export default function PricingPageTemp() {

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-15">Elige tu plan próximamente</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <PricingCardDashboard
          title="Gratis"
          price="$0"
          description="Perfecto para comenzar"
          features={[
            "Acceso limitado",  
            "3 chatbot",
            "Soporte básico",
          ]}
          
        />

        <PricingCardDashboard
          title="Pro"
          price="$150.00/mes"
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
