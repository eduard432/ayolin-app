"use client"

import { motion } from "framer-motion";

export default function DemoSection() {
  return (
    <section className="relative bg-black text-white py-20 px-6">
      {/* Fondo gradiente suave */}
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400"
        >
          Mira a Ayolin en Acción
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto mb-12"
        >
          Observa cómo Ayolin maneja conversaciones reales ofreciendo respuestas inteligentes y contextuales que hacen que cada interacción se sienta natural.
        </motion.p>

        {/* Área de demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg max-w-4xl mx-auto overflow-hidden"
        >
          <div className="aspect-video flex items-center justify-center text-neutral-400">
            {/* Placeholder por ahora */}
            Demostración interactiva próximamente
          </div>
        </motion.div>
      </div>
    </section>
  );
}
