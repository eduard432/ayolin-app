"use client"

import { ReactNode } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { ThemeProvider } from "next-themes"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const particlesInit = async (engine: Engine) => { await loadSlim(engine) }

  return (
    <ThemeProvider attribute="class" enableSystem={false} forcedTheme="light">
      <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
        {/* Fondo de partículas */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              color: { value: "#ffffff" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1,
              },
              move: { enable: true, speed: 1 },
              number: { value: 50 },
              opacity: { value: 0.2 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute inset-0 z-0"
        />

        {/* Contenedor del contenido (card transparente) */}
        <div className="relative z-10 w-full max-w-md px-6">
          
          {children}
          
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AuthLayout
