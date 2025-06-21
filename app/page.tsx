/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react";
import {
  FaMessage,
  FaBolt,
  FaShield,
  FaWandMagicSparkles,
  FaRegClock,
  FaHeart,
  FaBrain,
  FaClock,
  FaGlobe,
} from "react-icons/fa6";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar";
import Fotter from "@/components/Fotter";

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

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('navbar')
      if (window.scrollY > 10) {
        nav?.classList.add('shadow-md', 'bg-white', 'nav-scrolled')
      } else {
        nav?.classList.remove('shadow-md', 'bg-white', 'nav-scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navbar/>
      {/* Hero Section */}
      <div id="home" className="container mx-auto px-4 pt-20 pb-16 mt-10">
        <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
          <div className="mb-6 text-neutral-800 text-lg font-semibold">
            Conoce a tu asistente personal
          </div>
          <h1 className="text-9xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-blue-600 mb-6 py-3">
            Dile Hola a Ayolin
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 mb-8">
            Miles de posibilidades en un solo lugar. ¿Qué esperas?          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <form>
              <button
                className="h-20 rounded-md px-8 flex items-center text-lg border font-semibold bg-neutral-900 text-neutral-50 hover:bg-gradient-to-r hover:from-neutral-900 hover:to-blue-600 transition-colors duration-300"
                type="submit"
              >
                Chatea con Ayolin
              </button>
            </form>
          </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-neutral-700" data-aos="fade-up">
              <div className="flex items-center gap-2" >
                <FaShield className="h-5 w-5" />
                <span>Seguridad de nivel empresarial</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="h-5 w-5" />
                <span>Más de 100 idiomas</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegClock className="h-5 w-5" />
                <span>Disponibilidad 24/7</span>
              </div>
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16" data-aos="zoom-in">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Ayolin?</h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Descubre cómo Ayolin combina tecnología de inteligencia artificial de vanguardia
            con una comprensión genuina de la interacción humana para ofrecer una experiencia
            conversacional sin igual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="bg-neutral-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-950">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl p-8 shadow-lg" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Posibilidades Infinitas</h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Desde asistencia personal hasta soporte profesional, Ayolin se adapta a tus necesidades.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="text-center p-6 bg-neutral-100 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-neutral-500 font-semibold">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl p-8 shadow-lg" data-aos="fade-up">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mira a Ayolin en Acción</h2>
            <p className="text-neutral-500 text-lg">
              Observa cómo Ayolin maneja conversaciones reales, ofreciendo respuestas inteligentes
              y contextuales que hacen que cada interacción se sienta natural y significativa.
            </p>
          </div>
          <div className="aspect-video rounded-lg bg-neutral-200 flex items-center justify-center">
            <div className="text-neutral-500">Demostración interactiva próximamente</div>
          </div>
        </div>
      </div>
      
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



      {/*Seccion de footer   */}
      <Fotter/>
    </div>
  );
}

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
