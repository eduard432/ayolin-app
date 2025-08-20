// SIN "use client"
export default function DemoSection() {
	return (
		<section className="relative bg-black text-white py-20 px-6">
			{/* Fondo gradiente suave */}
			<div className="absolute inset-0 bg-black"></div>

			<div className="relative z-10 max-w-6xl mx-auto text-center">
				{/* Título */}
				<h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400 transition-all duration-700">
					Mira a Ayolin en Acción
				</h2>

				<p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-12 transition-opacity duration-700">
					Observa cómo Ayolin maneja conversaciones reales ofreciendo
					respuestas inteligentes y contextuales que hacen que cada interacción
					se sienta natural.
				</p>

				{/* Área de demo */}
				<div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg max-w-4xl mx-auto overflow-hidden transform transition-all duration-700 hover:scale-105">
					<div className="aspect-video flex items-center justify-center text-neutral-400">
						Demostración interactiva próximamente
					</div>
				</div>
			</div>
		</section>
	)
}
