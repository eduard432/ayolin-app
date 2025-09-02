"use client"

import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ThreeModel = dynamic(() => import("@/components/common/ThreeModel"), { ssr: false })

export default function Hero() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine)
  }

  return (
    <section id="home" className="relative bg-[#0d0d0d] text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4 },
            move: { enable: true, speed: 1 },
            number: { value: 50 },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Fallback visible sin JS */}
      <noscript>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-50">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 pb-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 via-violet-500 to-rose-600">
              Construye tu propia IA<br/>
              sin código
            </span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Tu asistente inteligente está listo para ayudarte. Activa JavaScript para verlo en acción.
          </p>
        </div>
      </noscript>

      {/* Contenido principal (con animaciones y 3D) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-10 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-star">

          <div className="text-center lg:text-left max-w-2xl mx-auto pt-30 lg:pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 pb-5">
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 via-violet-500 to-rose-600 bg-[length:200%_200%]"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                >
                  Construye tu propia IA <br/>
                  <span className="text-white">sin código</span>
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

            <motion.div className=" space-x-4 justify-center md:justify-start" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay:0.7, duration: 1 }}>
              <Link href="/dashboard/general">
                <Button className="px-12 h-15 w-40 text-lg text-black bg-white hover:bg-white/80" size="lg" >
                  Probar
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Modelo 3D */}
          <div className="relative z-10 mx-auto mt-16 w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
              <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff00ff" />
              <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
                <group>
                  <ThreeModel />
                </group>
              </Float>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
            </Canvas>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute inset-0 rounded-full bg-blue-500/15 blur-2xl"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black"></div>
    </section>
  )
}
