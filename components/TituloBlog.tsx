'use client'

import { motion } from "framer-motion"

export default function TituloBlog() {
  return (
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
  )
}
