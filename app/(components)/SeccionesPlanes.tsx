// SIN "use client"
import { PricingCardLanding } from '@/components/common/PaymentCardLanding'

export default function PricingSection() {
	return (
		<section
			id="planes"
			className="relative bg-black text-white pt-20 px-6 pb-30"
		>
			<div className="absolute inset-0"></div>

			{/* Encabezado */}
			<div className="relative z-10 max-w-6xl mx-auto text-center mb-12 transition-all duration-700">
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
					Próximamente
				</h2>
				<p className="text-white text-lg max-w-xl mx-auto">
					Podrás seleccionar el plan que mejor se adapte a tus necesidades.
				</p>
			</div>

			{/* Tarjetas */}
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
				<div className="transition-all duration-500 transform hover:scale-105">
					<PricingCardLanding
						title="Gratis"
						price="$0"
						description="Perfecto para comenzar"
						features={['Acceso limitado', '3 chatbot', 'Soporte básico']}
					/>
				</div>

				<div className="transition-all duration-500 transform hover:scale-105 delay-150">
					<PricingCardLanding
						title="Pro"
						price="$150.00/mes"
						description="Funciones avanzadas"
						features={[
							'Chatbots ilimitados',
							'Soporte prioritario',
							'Analíticas avanzadas',
							'Actualizaciones Pro',
						]}
						featured
					/>
				</div>
			</div>
		</section>
	)
}
