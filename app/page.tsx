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

const features = [
  {
    icon: <FaMessage className="h-5 w-5" />,
    title: "Natural Conversations",
    description:
      "Chat with Ayolin as naturally as you would with a friend. Experience human-like interactions powered by advanced AI.",
  },
  {
    icon: <FaBrain className="h-5 w-5" />,
    title: "Contextual Understanding",
    description:
      "Ayolin understands context and remembers your conversations, making each interaction more meaningful.",
  },
  {
    icon: <FaHeart className="h-5 w-5" />,
    title: "Empathetic Responses",
    description:
      "More than just answers - Ayolin provides thoughtful, empathetic responses that truly connect.",
  },
  {
    icon: <FaBolt className="h-5 w-5" />,
    title: "Lightning Fast",
    description:
      "Get instant responses 24/7, powered by state-of-the-art AI technology.",
  },
  {
    icon: <FaShield className="h-5 w-5" />,
    title: "Secure & Private",
    description:
      "Your conversations with Ayolin are encrypted and completely private. Your data stays yours.",
  },
  {
    icon: <FaGlobe className="h-5 w-5" />,
    title: "Multilingual Support",
    description:
      "Communicate with Ayolin in multiple languages, breaking down language barriers effortlessly.",
  },
  {
    icon: <FaWandMagicSparkles className="h-5 w-5" />,
    title: "Smart Learning",
    description:
      "Ayolin continuously learns and adapts to provide increasingly personalized and accurate responses.",
  },
  {
    icon: <FaClock className="h-5 w-5" />,
    title: "Always Available",
    description:
      "Get support anytime, anywhere. Ayolin is ready to help 24/7, never taking a break.",
  },
];

const useCases = [
  {
    title: "Customer Support",
    description: "Provide instant support to your customers around the clock.",
  },
  {
    title: "Personal Assistant",
    description:
      "Let Ayolin help manage your schedule, reminders, and daily tasks.",
  },
  {
    title: "Learning Companion",
    description: "Get help with research, homework, and learning new subjects.",
  },
  {
    title: "Creative Partner",
    description:
      "Brainstorm ideas and get creative inspiration for your projects.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 text-neutral-800 text-lg font-semibold">
            Meet Your AI Companion
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-blue-600 mb-6 py-3">
            Say Hello to Ayolin
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 mb-8">
            Your intelligent AI companion that understands, learns, and grows
            with you. Experience the next evolution in conversational AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <form>
              <button
                className="h-11 rounded-md px-8 flex items-center text-lg border semibold bg-neutral-900 text-neutral-50 font font-semibold"
                type="submit"
              >
                Chat With Ayolin
              </button>
            </form>
            <Link
              href="#demo"
              className="flex items-center h-11 rounded-md px-8 text-lg border semibold text-neutral-950 font-semibold"
            >
              Watch Demo
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-neutral-500">
            <div className="flex items-center gap-2">
              <FaShield className="h-5 w-5" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe className="h-5 w-5" />
              <span>100+ languages</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock className="h-5 w-5" />
              <span>24/7 availability</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Ayolin?</h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Discover how Ayolin combines cutting-edge AI technology with a
            genuine understanding of human interaction to deliver an
            unparalleled conversational experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Endless Possibilities</h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              From personal assistance to professional support, Ayolin adapts to
              your needs.
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
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See Ayolin in Action</h2>
            <p className="text-neutral-500 text-lg">
              Watch how Ayolin handles real conversations, providing intelligent
              and contextual responses that make every interaction feel natural
              and meaningful.
            </p>
          </div>
          <div className="aspect-video rounded-lg bg-neutral-200 flex items-center justify-center">
            <div className="text-neutral-500">Interactive Demo Coming Soon</div>
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
        <footer className="bg-neutral-900 text-white mt-5 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12">
            {/* Columna 1 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Sobre Nosotros</h2>
              <a href="/sign__up" className="text-sm hover:underline">Cómo funciona</a>
              <a href="/" className="text-sm hover:underline">Testimonios</a>
              <a href="/" className="text-sm hover:underline">Carreras</a>
              <a href="/" className="text-sm hover:underline">Términos del servicio</a>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Contáctanos</h2>
              <a href="/" className="text-sm hover:underline">Contacto</a>
              <a href="/" className="text-sm hover:underline">Soporte</a>
              <a href="/" className="text-sm hover:underline">Destinos</a>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Videos</h2>
              <a href="/" className="text-sm hover:underline">Enviar video</a>
              <a href="/" className="text-sm hover:underline">Embajadores</a>
              <a href="/" className="text-sm hover:underline">Agencia</a>
            </div>

            {/* Columna 4 */}
            <div className="flex flex-col text-left gap-2">
              <h2 className="mb-4 text-lg font-bold text-white">Redes Sociales</h2>
              <a href="/" className="text-sm hover:underline">Instagram</a>
              <a href="/" className="text-sm hover:underline">Facebook</a>
              <a href="/" className="text-sm hover:underline">YouTube</a>
              <a href="/" className="text-sm hover:underline">Twitter</a>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="w-full border-t border-gray-700 mt-12 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-6xl mx-auto">
              <a href="/" className="text-2xl font-semibold text-white mb-4 md:mb-0">
                AYOLIN
              </a>
              <p className="text-sm text-white mb-4 md:mb-0">
                © AYOLIN 2025. Todos los derechos reservados
              </p>
              <div className="flex gap-4">
                {[
                  "facebook.png",
                  "instagram.png",
                  "youtube.png",
                  "linkedin.png",
                  "tik-tok.png",
                  "whatsapp.png",
                ].map((icon, idx) => (
                  <a key={idx} href="/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={`img/${icon}`}
                      alt={icon}
                      className="w-8 h-8 rounded-full hover:scale-105 transition-transform"
                    />
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
