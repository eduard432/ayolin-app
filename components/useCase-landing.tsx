"use client"

import { motion } from "framer-motion";

interface UseCase {
  title: string;
  description: string;
}

export default function UseCases({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="relative bg-black text-white py-20 px-6">
      {/* Gradiente sutil de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400"
        >
          Posibilidades Infinitas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto mb-12"
        >
          Desde asistencia personal hasta soporte profesional, Ayolin se adapta a tus necesidades.
        </motion.p>

        {/* Grid de Use Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-neutral-400 text-sm">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
