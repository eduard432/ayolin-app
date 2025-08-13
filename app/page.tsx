import React from "react";
import {
  FaMessage,
  FaBolt,
  FaShield,
  FaWandMagicSparkles,
  FaHeart,
  FaBrain,
  FaClock,
  FaGlobe,
} from "react-icons/fa6";
import  Hero  from '@/components/HeroLanding'
import Features from '@/components/FeaturesLanding'
import UseCases from "@/components/UseCases";
import DemoSection from "@/components/DemoLanding";

import Navbar from '@/components/navbarLanding'
import Fotter from "@/components/Fotter";
import AOSInit from "@/components/AOSInit";
import PricingSection from "@/components/SeccionesPlanes";

const features = [
  {
    icon: <FaMessage className="h-5 w-5" />,
    title: "Conversaciones Naturales",
    description:
      "Chatea con Ayolin de forma tan natural como lo harías con un amigo. Experimenta interacciones humanas impulsadas por IA avanzada.",
  },
  {
    icon: <FaBrain className="h-5 w-5" />,
    title: "Comprensión Contextual",
    description:
      "Ayolin entiende el contexto y recuerda tus conversaciones, haciendo que cada interacción sea más significativa.",
  },
  {
    icon: <FaHeart className="h-5 w-5" />,
    title: "Respuestas Empáticas",
    description:
      "Más que solo respuestas: Ayolin ofrece respuestas empáticas y reflexivas que realmente conectan.",
  },
  {
    icon: <FaBolt className="h-5 w-5" />,
    title: "Velocidad Relámpago",
    description:
      "Recibe respuestas instantáneas las 24 horas, todos los días, gracias a tecnología de IA de última generación.",
  },
  {
    icon: <FaShield className="h-5 w-5" />,
    title: "Seguro y Privado",
    description:
      "Tus conversaciones con Ayolin están encriptadas y son completamente privadas. Tus datos siguen siendo tuyos.",
  },
  {
    icon: <FaGlobe className="h-5 w-5" />,
    title: "Soporte Multilingüe",
    description:
      "Comunícate con Ayolin en varios idiomas, eliminando barreras de lenguaje sin esfuerzo.",
  },
  {
    icon: <FaWandMagicSparkles className="h-5 w-5" />,
    title: "Aprendizaje Inteligente",
    description:
      "Ayolin aprende y se adapta continuamente para ofrecer respuestas cada vez más precisas y personalizadas.",
  },
  {
    icon: <FaClock className="h-5 w-5" />,
    title: "Disponible Siempre",
    description:
      "Obtén ayuda en cualquier momento y lugar. Ayolin está disponible las 24/7, sin descansos.",
  },
];


const useCases = [
  {
    title: "Soporte al Cliente",
    description: "Brinda soporte instantáneo a tus clientes las 24 horas del día.",
  },
  {
    title: "Asistente Personal",
    description:
      "Deja que Ayolin te ayude a gestionar tu agenda, recordatorios y tareas diarias.",
  },
  {
    title: "Compañero de Aprendizaje",
    description: "Obtén ayuda con investigaciones, tareas y nuevos temas de estudio.",
  },
  {
    title: "Generador de Ideas",
    description:
      "Transforma tus ideas en planes claros con ayuda de Ayolin.",
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