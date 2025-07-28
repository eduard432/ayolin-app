"use client"

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
import  Hero  from '@/components/hero-landing'
import Features from '@/components/features-landing'
import UseCases from "@/components/useCase-landing";
import DemoSection from "@/components/demo-landing";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbarLanding";
import Fotter from "@/components/Fotter";
import { PricingCardLanding } from "@/components/payment-card-landing";

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
    title: "Socio Creativo",
    description:
      "Genera ideas y recibe inspiración creativa para tus proyectos.",
  },
];

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,     
    });
  }, []);

  return (
    <div className="min-h-screen ">
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

        <section id="planes" className="relative bg-black text-white pt-20 px-6 pb-30">
          {/* Gradiente de fondo */}
          <div className="absolute inset-0"></div>

          <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
              Próximamente
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              Podrás seleccionar el plan que mejor se adapte a tus necesidades.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
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

      <div className="relative z-10 bg-black border-t border-white/10 w-full"></div>
      
      {/*Seccion de footer   */}
      <Fotter />

    </div>
  );
}

    {/*Mas cosas que se pueden agregar a la landing page */}


      {/* CTA Section */}
      {/*
      <div className="container mx-auto px-4 py-16">
        <div className="bg-neutral-900 rounded-xl p-12 text-neutral-50 text-center">
          <h2 className="text-4xl font-bold mb-4 ">
            Start Your Journey with Ayolin
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the future of
            AI-driven conversations. Try one Ayolin Chat for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="h-11 rounded-md px-8 text-lg border font-semibold bg-neutral-50 text-neutral-900">
              Start For Free Trial
            </button>
            <button className="h-11 rounded-md px-8 text-lg border font-semibold">
              Schedule demo
            </button>
          </div>
          <p className="mt-6 text-sm text-neutral-300 font-semibold">
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </div>
      */}

      {/* TENEMOS QUE ARREGLAR ESTE, ME QUEDO FEO CON GANAS
      
      <div className="bg-stone-100 py-20 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-black bg-clip-text">
            ¿Cómo funciona Ayolin?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-neutral-100 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all ">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">1. Inicia sesión</h3>
              <p className="text-neutral-500 text-lg">Necesitas una cuenta para poder usar AYOLIN.</p>
            </div>

           
            <div className="p-6 bg-neutral-100 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">2. Personalízalo</h3>
              <p className="text-neutral-500 text-lg">AYOLIN te da las herramientas para crear tu IA como quieras.</p>
            </div>

            
            <div className="p-6 bg-neutral-100 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">3. ¡Utilízalo!</h3>
              <p className="text-neutral-500 text-lg">Una vez configurada tu IA, úsala para tus proyectos o empresa.</p>
            </div>
          </div>
        </div>
      </div>
          */}
