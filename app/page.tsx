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
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const icons = [
  { icon: <FaFacebookF />, link: "/" },
  { icon: <FaInstagram />, link: "/" },
  { icon: <FaYoutube />, link: "/" },
  { icon: <FaLinkedinIn />, link: "/" },
  { icon: <FaTiktok />, link: "/" },
  { icon: <FaWhatsapp />, link: "/" },
];

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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
          <div className="mb-6 text-neutral-800 text-lg font-semibold">
            Conoce a tu asistente personal
          </div>
          <h1 className="text-9xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-blue-600 mb-6 py-3">
            Dile Hola a Ayolin
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 mb-8">
            Milies de posibilidades es un solo lugar, que esperas!!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <form>
              <button
                className="h-20 rounded-md px-8 flex items-center text-lg border semibold bg-neutral-900 text-neutral-50 font font-semibold"
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
      {/*Seccion de footer   */}
        <footer className="bg-neutral-900 text-white mt-5 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12">
            {/* Columna 1 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Sobre Nosotros</h2>
              <a href="/sign__up" className="text-sm hover:underline">Cómo funciona</a>
              <Link href="/" className="text-sm hover:underline">Testimonios</Link>
              <Link href="/" className="text-sm hover:underline">Carreras</Link>
              <Link href="/" className="text-sm hover:underline">Términos del servicio</Link>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Contáctanos</h2>
              <Link href="/" className="text-sm hover:underline">Contacto</Link>
              <Link href="/" className="text-sm hover:underline">Soporte</Link>
              <Link href="/" className="text-sm hover:underline">Destinos</Link>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Videos</h2>
              <Link href="/" className="text-sm hover:underline">Enviar video</Link>
              <Link href="/" className="text-sm hover:underline">Embajadores</Link>
              <Link href="/" className="text-sm hover:underline">Agencia</Link>
            </div>

            {/* Columna 4 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Redes Sociales</h2>
              <Link href="/" className="text-sm hover:underline">Instagram</Link>
              <Link href="/" className="text-sm hover:underline">Facebook</Link>
              <Link href="/" className="text-sm hover:underline">YouTube</Link>
              <Link href="/" className="text-sm hover:underline">Twitter</Link>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="w-full border-t border-gray-700 mt-12 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto">
              <Link href="/" className="text-2xl font-semibold text-white mb-4 md:mb-0">
                AYOLIN
              </Link>
              <p className="text-sm text-white mb-4 md:mb-0">
                © AYOLIN 2025. Todos los derechos reservados
              </p>
              <div className="flex gap-4">
                {icons.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
