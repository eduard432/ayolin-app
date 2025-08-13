'use client'

export default function TituloBlog() {
	return (
		<>
			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes gradientShift {
					0%,
					100% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
				}

				.fade-in-up {
					animation: fadeInUp 0.8s ease-out forwards;
				}

				.fade-in-delayed {
					opacity: 0;
					animation: fadeInUp 0.8s ease-out forwards;
					animation-delay: 0.5s;
				}

				.animated-gradient {
					background-size: 200% 200%;
					animation: gradientShift 6s ease-in-out infinite;
				}
			`}</style>

			<div className="fade-in-up">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-100">
					Blog de{' '}
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animated-gradient">
						AYOLIN
					</span>
				</h1>
			</div>

			<div className="fade-in-delayed">
				<p className="text-center text-white mt-4 mb-12 max-w-2xl mx-auto">
					Noticias, tutoriales y guías para ayudarte a sacar el máximo de
					nuestras herramientas.
				</p>
			</div>
		</>
	)
}
