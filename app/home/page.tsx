import AOSInit from '@/components/common/AOSInit'
import { ExampleConversation } from '@/components/common/ConversationExample'
import EjemploConversacion from '@/components/common/EjemploConversacion'
import NavbarBase from '@/components/layout/landing/NavbarBase'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ClientButtons = () => {
	return (
		<div className="flex gap-x-2">
			<Button variant="outline" size="sm">
				Iniciar Sesión
			</Button>
			<Button variant="default" size="sm">
				Registrarse
			</Button>
			<Avatar>
				<AvatarFallback />
			</Avatar>
		</div>
	)
}

const Navbar = () => {
	return (
		<nav className="px-8 py-4 flex items-center justify-between fixed z-50 bg-black/40 backdrop-blur-md w-full border-b border-white/10">
			<div className="flex items-center gap-x-8">
				<Link
					href="/"
					className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent tracking-widest"
				>
					AYOLIN
				</Link>
				<div>
					<Button
						variant="ghost"
						className="rounded-full text-neutral-400"
						size="sm"
					>
						Características
					</Button>
					<Button
						variant="ghost"
						className="rounded-full text-neutral-400"
						size="sm"
					>
						Precio
					</Button>
					<Button
						variant="ghost"
						className="rounded-full text-neutral-400"
						size="sm"
					>
						Documentación
					</Button>
				</div>
			</div>
			<ClientButtons />
		</nav>
	)
}

const Hero = () => {
	return (
		<section className="min-h-96 py-48 flex items-center justiyfy-center">
			<div className="text-start w-full">
				<h2 className="py-2 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500">
					Construye tu propia IA <br />
					sin código
				</h2>
				<p className="text-neutral-400">
					Miles de posibilidades en un solo lugar. ¿Que esperas?
				</p>
				<div className="mt-20 space-x-4">
					<Button className="px-12" size="lg">
						Probar
					</Button>
					<Button className="px-12" size="lg" variant="outline">
						Saber más
					</Button>
				</div>
			</div>
		</section>
	)
}

const Info = () => {
	return (
		<section className="w-full grid grid-cols-2">
			<div>
				<h3 className="text-5xl max-w-full leading-16">
					Asistente Personal, Ventas, Estudio
				</h3>
			</div>
			<ExampleConversation
				messages={[
					{
						texto:
							'Hola Ayolin, ¿puedes ayudarme a responder mensajes de clientes?',
						tipo: 'user',
					},
					{
						texto:
							'¡Claro! ¿Quieres que active el flujo de soporte y etiquete consultas urgentes?',
						tipo: 'bot',
					},
					{
						texto: 'Sí, y recuérdame llevar el coche a lavar mañana.',
						tipo: 'user',
					},
					{
						texto:
							'Hecho. También puedo enviar un resumen al finalizar el día.',
						tipo: 'bot',
					},
				]}
			/>
		</section>
	)
}

const HomePage = () => {
	return (
		<>
			<Navbar />
			<div className="pt-20 px-4 w-full md:w-9/12 mx-auto space-y-20">
				<Hero />
				<Info />
			</div>
			<div className="text-white pt-20">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum magni
				ut corporis autem, numquam voluptas nam itaque nemo ducimus quaerat
				laboriosam necessitatibus molestias beatae inventore nihil eveniet
				reprehenderit officia consequuntur a vero, vel quia architecto labore
				ullam? Laudantium odio alias, asperiores ipsam tenetur error sint hic
				quis saepe dignissimos temporibus laborum aspernatur minima enim
				obcaecati debitis molestias possimus cum! Omnis quisquam similique
				aspernatur eaque. Explicabo labore optio ex? Voluptatem in sunt
				perspiciatis maiores deleniti sequi laudantium dolorum, dolorem
				corrupti aut repellat excepturi facere nisi voluptatibus minima.
				Officia delectus, eos nulla, recusandae nemo fugit, laboriosam
				accusamus qui officiis quia iste aliquid dolore? Fuga tenetur natus
				nihil vitae laboriosam. Repellendus quia aut odio tempora dicta,
				provident sed. Quos facilis veniam doloremque neque nostrum fuga
				pariatur dolorum, id tempore ab dolore natus debitis modi placeat
				incidunt nulla enim repellendus exercitationem rerum necessitatibus
				commodi! Adipisci incidunt a hic accusantium totam fugit deserunt quia
				atque, sint quam quae praesentium temporibus suscipit repellendus
				dignissimos facere quaerat, soluta inventore at exercitationem ut
				maxime! Cumque repudiandae provident nesciunt perferendis. Nihil
				laboriosam, eos libero sequi fuga odit deleniti at velit, asperiores
				quas provident explicabo aspernatur perspiciatis beatae rerum et odio
				itaque ex reprehenderit? Accusantium aliquam repellendus, eum aut est
				quis numquam fuga omnis, nobis quam blanditiis? Dolorum voluptas qui
				quia quae blanditiis deleniti reprehenderit culpa reiciendis illo?
				Laudantium, officiis sequi alias ipsum doloribus hic dolore,
				consequuntur perferendis est saepe nisi ipsa illo expedita aperiam
				quibusdam minima aut nostrum eum quasi dolores cupiditate atque! Error,
				voluptatum sit. Autem officiis provident aut nulla perspiciatis
				aspernatur quia doloremque exercitationem nam tempore possimus eaque
				saepe dicta vel, sapiente neque aperiam odit rem reiciendis obcaecati!
				Aliquam sequi quos vitae maxime natus labore nam sed suscipit adipisci?
				Ipsam, alias aliquam veniam illo, debitis dolore culpa facere unde
				sapiente distinctio deleniti quam, impedit dicta! Quis culpa laborum
				voluptates doloremque quaerat eligendi assumenda aliquam atque,
				incidunt veritatis sed blanditiis et. Eligendi asperiores repudiandae
				numquam, porro nesciunt modi placeat ipsum provident consequuntur
				assumenda omnis autem repellat est sint reprehenderit, quae dolorem?
				Fugiat earum porro asperiores illum possimus? Dolore ipsum totam
				expedita, quidem fugiat, fuga beatae aliquid voluptates laborum nemo
				laudantium magni, consequatur similique. Officiis sed ratione ut
				facilis animi perspiciatis expedita corporis rem excepturi, quae
				dolores beatae enim quidem odio earum. Illum at quis ipsam asperiores
				est cum maxime odit tenetur. Ullam qui corporis veniam quo adipisci
				illo iure dolorem minima cumque aliquid dicta autem, quaerat temporibus
				minus, alias, nulla eveniet laborum vitae voluptates. A velit corrupti,
				obcaecati quisquam illo et dolores, impedit quibusdam rem expedita
				delectus ipsa corporis nesciunt ad soluta dolorem ipsam officia aperiam
				qui ipsum minima debitis repellendus praesentium quo. Accusantium
				ratione, optio nam repudiandae labore enim porro nisi veniam, nesciunt
				molestias illum delectus explicabo expedita? Perferendis suscipit ipsa
				quo quae eligendi magni nihil repellendus consequatur natus, voluptas
				dignissimos facilis nisi modi, nobis fugit possimus minus quas illo
				libero quibusdam, aperiam accusantium delectus. Porro, corporis
				consequuntur ducimus velit molestiae aliquam voluptatem explicabo nam
				tenetur blanditiis! Beatae doloribus optio debitis velit maiores aut
				illo dicta illum quaerat vel consectetur ullam provident deserunt
				repudiandae facilis fugiat laboriosam nesciunt, accusantium saepe
				cupiditate doloremque neque sed rem aliquid. Dolorum similique id, sit
				magni voluptates placeat! Laborum nulla quae voluptas quidem, repellat
				delectus quod iste vel placeat hic in. Perferendis recusandae
				distinctio, at sunt saepe nulla, architecto rerum ullam facilis modi
				qui deleniti placeat possimus quos alias soluta exercitationem illo
				officia? Possimus saepe inventore, tenetur quos mollitia ullam eos
				harum, minima reprehenderit ab, officiis odio. Et vero fugiat quibusdam
				animi assumenda impedit non qui, expedita fugit omnis sint recusandae
				doloremque exercitationem, est ullam natus itaque similique iure quod
				soluta iste at! Reprehenderit officiis explicabo tenetur quisquam
				eveniet exercitationem consequatur odio aspernatur molestias culpa
				facilis dolorum architecto voluptatibus, similique nulla minus
				accusantium dolore at obcaecati ad dicta magni? Suscipit minima quae,
				hic deserunt eius architecto placeat dolorem, nihil amet fugiat,
				laborum praesentium porro possimus blanditiis alias maiores tempora
				ratione quod? Voluptatem ducimus magnam dicta. Soluta commodi tempore
				tenetur facilis quibusdam. Labore omnis laudantium quas? Harum ea
				dolorum voluptates dolores commodi. Voluptates mollitia non excepturi
				iusto deserunt eum, eos blanditiis possimus eius exercitationem?
				Quisquam, non provident beatae adipisci ut est vel unde ipsam magni
				quos dolorum autem pariatur dolorem consequuntur nobis eius
				reprehenderit perferendis quod explicabo amet nulla impedit. Minus
				provident voluptates maiores, quidem tempora, voluptate, vitae
				explicabo omnis nihil reprehenderit eum eveniet sit. Corporis
				laudantium accusamus, eaque amet nisi recusandae repellendus cumque
				dicta minima! Assumenda, nostrum, explicabo nisi nemo distinctio
				tenetur illum placeat repudiandae, consequuntur omnis facilis saepe
				commodi repellendus rem? Nam, enim nemo! Dolor eum labore delectus, ex
				dolores non quasi tempore assumenda necessitatibus accusantium
				perspiciatis dicta. Nihil delectus, inventore magnam ratione
				accusantium quibusdam vel dolorem eveniet ad dolorum libero quod
				debitis, omnis deleniti? Voluptas ipsa quo repellat quam commodi rerum
				tempore, optio temporibus officia natus consequuntur alias quia porro
				ut odio aliquid aut fugiat quibusdam totam deserunt ad aspernatur
				repellendus dignissimos numquam. Labore nam iste ipsum mollitia
				accusantium similique veniam repellendus cupiditate, delectus
				perspiciatis voluptatibus eligendi omnis corporis quae minus
				repudiandae soluta sit! Unde omnis autem, tempore accusantium eius
				sequi expedita, facere, rerum ab voluptas accusamus? Vero ullam,
				reprehenderit reiciendis hic aliquid sint nam dolore libero odit fugiat
				maiores quis. Ut excepturi incidunt magni. Vero molestias placeat
				architecto aliquam quidem labore officiis soluta, odit vitae nostrum
				amet repellendus similique eius possimus veniam aspernatur harum
				quibusdam id recusandae dolore praesentium minima consequatur officia
				aut? Molestias temporibus, animi aliquid soluta qui, hic omnis nemo
				neque doloremque recusandae dolorum ipsum tempore deserunt rem
				voluptate quasi error sunt voluptatum magnam. In voluptates blanditiis
				ad, maiores corporis dicta sit explicabo est soluta obcaecati rem
				nulla, minima iure odio et ex nihil alias reiciendis, quia non
				temporibus cumque? Aperiam rerum impedit, adipisci tempora officiis
				illo atque. Maxime laborum earum officia eveniet repellendus numquam
				maiores doloremque voluptate quos, sit a ad suscipit pariatur veritatis
				fugiat est architecto ex enim consectetur laudantium. Vitae, dolor
				tempore? Deleniti libero suscipit architecto accusamus dolores,
				temporibus, vel delectus expedita a, aliquam mollitia eligendi ipsa.
				Corrupti ratione reprehenderit, eveniet totam officiis quos.
			</div>
		</>
	)
}

export default HomePage
