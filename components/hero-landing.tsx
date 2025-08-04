"use client"

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import dynamic from "next/dynamic"
 
const ThreeModel = dynamic(() => import("@/components/ThreeModel"), { ssr: false })

export default function Hero() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine); 
  };

  return (
    <section id="home" className="relative bg-[#0d0d0d] text-white">
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

        <motion.div 
          initial={{opacity: 0, y:30}}
          animate={{opacity: 1, y:0 }}
          transition={{duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-100 pb-5">
            Dile Hola a{" "}
            <motion.span
              className="bg-clip-text text-transparent 
                        bg-gradient-to-r from-sky-700 via-violet-500 to-rose-600 
                        bg-[length:200%_200%]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              AYOLIN
            </motion.span>
          </h1>
        </motion.div>

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
          <button className="h-20 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-lg hover:scale-105 transition-all shadow-lg">
            Chatea con Ayolin
          </button>
        </motion.div>

        {/* Modelo 3D */}
        <div className="relative z-10 mx-auto mt-16 w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            {/* Luces */}
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
            <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff00ff" />

            {/* Efecto flotante */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
              <group>
                {/* Modelo con efecto de holograma */}
                <ThreeModel />
              </group>
            </Float>

            {/* Control de cámara */}
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>

          {/* Glow extra detrás del modelo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 rounded-full bg-blue-500/15 blur-2xl"
          />


        </div>

      </div>

      {/* Gradiente de transición hacia negro */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black"></div>
    </section>
  );
}

        {/* Ilustración flotante Para MAYBE usarla despues
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
        */}
