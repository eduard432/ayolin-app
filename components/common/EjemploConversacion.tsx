"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageSquare } from "lucide-react"
import { motion, useInView } from "framer-motion"
import clsx from "clsx"

type Msg = { texto: string; tipo: "user" | "bot" }

const MENSAJES: Msg[] = [
  { texto: "Hola Ayolin, ¿puedes ayudarme a responder mensajes de clientes?", tipo: "user" },
  { texto: "¡Claro! ¿Quieres que active el flujo de soporte y etiquete consultas urgentes?", tipo: "bot" },
  { texto: "Sí, y recuérdame llevar el coche a lavar mañana.", tipo: "user" },
  { texto: "Hecho. También puedo enviar un resumen al finalizar el día.", tipo: "bot" },
]

export default function EjemploConversacion() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(containerRef, { margin: "0px 0px -20% 0px", once: true, amount: 0.35 })

  const intervaloMs = 1200
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const timeouts: NodeJS.Timeout[] = []
    setIsTyping(true)

    MENSAJES.forEach((_, i) => {
      const tShow = setTimeout(() => {
        setIsTyping(false)
        setVisibleCount((v) => v + 1)
        if (i < MENSAJES.length - 1) {
          const tType = setTimeout(() => setIsTyping(true), Math.min(300, intervaloMs / 3))
          timeouts.push(tType)
        }
      }, i * intervaloMs)
      timeouts.push(tShow)
    })

    const tEnd = setTimeout(() => setIsTyping(false), MENSAJES.length * intervaloMs + 200)
    timeouts.push(tEnd)

    return () => timeouts.forEach(clearTimeout)
  }, [inView])

  const visibles = useMemo(() => MENSAJES.slice(0, visibleCount), [visibleCount])
  const nextMsgType = MENSAJES[visibleCount]?.tipo

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-sm sm:max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-neutral-300">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm">Ejemplo de conversación</span>
        </div>

        <div className="flex flex-col gap-3 min-h-64">
          {visibles.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={clsx(
                "max-w-[85%] px-3 py-2 text-sm border border-white/10 rounded-2xl",
                msg.tipo === "user"
                  ? "self-end ml-auto rounded-br-sm bg-emerald-700/50 text-neutral-100"
                  : "self-start rounded-bl-sm bg-white/10 text-neutral-100"
              )}
            >
              {msg.texto}
            </motion.div>
          ))}

          {isTyping && nextMsgType && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={clsx(
                "max-w-[60%] px-3 py-2 text-sm border border-white/10 rounded-2xl inline-flex items-center gap-2",
                nextMsgType === "user"
                  ? "self-end ml-auto rounded-br-sm bg-emerald-700/50 text-neutral-100"
                  : "self-start rounded-bl-sm bg-white/12 text-neutral-100"
              )}
            >
              <span className="sr-only">escribiendo…</span>
              <div className="flex items-center gap-1">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-300"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                />
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-300"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
                />
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-300"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.24 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs text-neutral-400">Escribe un mensaje…</span>
        </div>
      </div>
    </div>
  )
}
