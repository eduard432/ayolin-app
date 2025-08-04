'use client'

import { motion } from "framer-motion"

export default function TituloBlog() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-100">
          Blog de{" "}
          <motion.span
            className="bg-clip-text text-transparent 
                      bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                      bg-[length:200%_200%]"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            AYOLIN
          </motion.span>
        </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-center text-white mt-4 mb-12 max-w-2xl mx-auto">
            Noticias, tutoriales y guías para ayudarte a sacar el máximo de nuestras herramientas.
          </p>
        </motion.div>
    </>
  )
}
