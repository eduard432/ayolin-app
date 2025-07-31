'use client'

import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
      
      {/* Texto grande 404 */}
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-8xl font-bold text-white mb-6 z-10"
      >
        404
      </motion.h1>

      {/* Texto de descripción */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-white text-lg mb-8 text-center px-4 z-10"
      >
        Oops... La página que buscas no existe (aún).  
        Parece que te has perdido en el espacio.
      </motion.p>

      {/* Botón para regresar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="z-10"
      >
        <Link href="/">
          <Button className="px-6 py-3 text-lg text-black bg-sky-700 hover:bg-sky-800 h-15">
            Volver a Home
          </Button>
        </Link>
      </motion.div>

      {/* Canvas 3D de la esfera */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={5} />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial color="#276CF5" wireframe />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    </div>
  )
}
