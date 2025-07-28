"use client"

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function Hero() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine); 
  };

  return (
    <section className="relative bg-[#0d0d0d] text-white">
      <Particles id="tsparticles" init={particlesInit} options={{
        background: { color: "transparent" },
        particles: {
          color: { value: "#ffffff" },
          links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2 },
          move: { enable: true, speed: 1 },
          number: { value: 50 },
          opacity: { value: 0.2 },
          size: { value: { min: 1, max: 3 } }
        }
      }} className="absolute inset-0 z-0" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-lg text-neutral-300"
        >
          Conoce a tu asistente personal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500 mb-6"
        >
          Dile Hola a Ayolin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          Miles de posibilidades en un solo lugar. ¿Qué esperas?
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-lg hover:scale-105 transition-all shadow-lg">
            Chatea con Ayolin
          </button>
        </motion.div>

        {/* Ilustración flotante */}
        <motion.img
          src="/img/image-tres-landing.png"
          alt="Ilustración Ayolin"
          className="relative z-10 mx-auto mt-16 w-80 md:w-96"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [20, 0, 20], opacity: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Gradiente de transición hacia negro */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black"></div>
    </section>
  );
}
