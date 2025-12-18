import React from "react";
import {
  IconMessage,
  IconBolt,
  IconShield,
  IconSparkles,
  IconHeart,
  IconBrain,
  IconClock,
  IconWorld,
} from "@tabler/icons-react"
import  Hero  from '@/app/(components)/HeroLanding'
import Info from "@/app/(components)/InfoLanding"
import Features from '@/app/(components)/FeaturesLanding'
import UseCases from "@/app/(components)/UseCases";
import DemoSection from "@/app/(components)/DemoLanding";

import Navbar from '@/components/layout/landing/index'
import Fotter from "@/components/layout/Footer";
import AOSInit from "@/components/common/AOSInit";
import PricingSection from "@/app/(components)/SeccionesPlanes";

const features = [
  {
    icon: <IconMessage className="h-5 w-5" />,
    title: "Chat sin Código",
    description:
      "Crea chatbots personalizados sin programar nada. Solo elige, arrastra y personaliza a tu estilo.",
  },
  {
    icon: <IconBrain className="h-5 w-5" />,
    title: "Inteligencia Contextual",
    description:
      "Ayolin entiende el contexto, recuerda interacciones y se adapta a cada conversación.",
  },
  {
    icon: <IconHeart className="h-5 w-5" />,
    title: "Personalidad Única",
    description:
      "Dale a tu chatbot el tono que quieras: formal, cercano o divertido. Tú decides cómo habla tu IA.",
  },
  {
    icon: <IconBolt className="h-5 w-5" />,
    title: "Rápido y Confiable",
    description:
      "Respuestas inmediatas en todo momento, gracias a una infraestructura optimizada para velocidad.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Privacidad Primero",
    description:
      "Tus datos y los de tus clientes están protegidos. Conexiones seguras y cifrado de extremo a extremo.",
  },
  {
    icon: <IconWorld className="h-5 w-5" />,
    title: "Disponible en Múltiples Canales",
    description:
      "Integra tu chatbot en Telegram, y pronto también en WhatsApp y Discord.",
  },
  {
    icon: <IconSparkles className="h-5 w-5" />,
    title: "Plugins a tu Medida",
    description:
      "Agrega funciones extras como catálogos de productos, flujos de soporte o recordatorios con solo un clic.",
  },
  {
    icon: <IconClock className="h-5 w-5" />,
    title: "Siempre Activo",
    description:
      "Ayolin trabaja 24/7 para ti, sin pausas, sin descansos, siempre listo para ayudar.",
  },
];

const useCases = [
  {
    title: "Soporte al Cliente",
    description:
      "Atiende dudas frecuentes, canaliza consultas urgentes y brinda servicio 24/7 sin contratar más personal.",
  },
  {
    title: "Asistente Personal",
    description:
      "Organiza tu agenda y hasta gestiona tareas pendientes directamente desde tu teléfono.",
  },
  {
    title: "Educación y Aprendizaje",
    description:
      "Explica temas, responde preguntas y acompaña a estudiantes o profesionales en su proceso de formación.",
  },
  {
    title: "Ventas Automatizadas",
    description:
      "Convierte a Ayolin en tu mejor vendedor: muestra productos, responde cotizaciones y cierra pedidos automáticamente. (Proximamente)",
  },
];

export default function Home() {

  return (
    <div className="min-h-screen ">
      <AOSInit />
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      {/* Info Section */}
      <Info/>

      {/* Features Section */}
      < Features features={features} />

      {/* Use Cases Section */}
      < UseCases useCases={useCases} />

      {/* Demo Section */}
      < DemoSection />

      {/*Planes de cobro */}
      <PricingSection />

      <div className="relative z-10 bg-black border-t border-white/10 w-full"></div>
      
      {/*Seccion de footer   */}
      <Fotter />

    </div>
  );
}