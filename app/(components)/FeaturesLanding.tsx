import { JSX } from 'react'

interface Feature {
	icon: JSX.Element
	title: string
	description: string
}

export default function Features({ features }: { features: Feature[] }) {
	return (
		<section id="features" className="relative bg-black text-white py-20 px-6">
			<div className="max-w-6xl mx-auto text-center mb-16">
				<h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
					¿Por qué elegir AYOLIN?
				</h2>
				<p className="text-white text-lg max-w-2xl mx-auto">
					AYOLIN te permite crear chatbots 100% personalizables sin escribir
					una sola línea de código. Conecta plugins, adáptalos a tu estilo
					y ten tu propia IA lista para en tu teléfono o en ayolin.com
				</p>
			</div>

			<style>
				{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
			</style>

			{/* Grid de features */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
				{features.map((feature, index) => (
					<div
						key={index}
						className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 hover:scale-105 transform transition-all duration-300"
						style={{
							animation: 'fadeUp 0.8s ease-out forwards',
							animationDelay: `${index * 0.1}s`,
							opacity: 0,
						}}
					>
						<div className="text-blue-400 mb-4">{feature.icon}</div>
						<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
						<p className="text-neutral-400 text-sm">{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	)
}
