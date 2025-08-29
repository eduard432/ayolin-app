// SIN "use client"
interface UseCase {
	title: string
	description: string
}

export default function UseCases({ useCases }: { useCases: UseCase[] }) {
	return (
		<section id="usecases" className="relative bg-black text-white py-20 px-6">
			<div className="absolute inset-0"></div>

			<div className="relative z-10 max-w-6xl mx-auto text-center">
				<h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-400">
					Posibilidades Infinitas
				</h2>
				<p className="text-white text-lg max-w-2xl mx-auto mb-12">
					Desde asistencia personal hasta soporte profesional, Ayolin se adapta
					a tus necesidades.
				</p>

				{/* Grid de Use Cases */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{useCases.map((useCase, index) => (
						<div
							key={index}
							className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 transform transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center min-h-[180px]"
						>
							<h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
							<p className="text-neutral-400 text-sm">{useCase.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
