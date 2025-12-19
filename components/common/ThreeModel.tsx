'use client'

import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODES = 60 // cantidad de nodos
const RADIUS = 1.5 // radio de la esfera
const CONNECTION_DISTANCE = 1 // distancia máxima para conectar nodos

export default function ThreeModel() {
	// Genera posiciones fijas de los nodos
	const nodes = useMemo(() => {
		const arr: THREE.Vector3[] = []
		for (let i = 0; i < NODES; i++) {
			// distribución pseudo-esférica
			const phi = Math.acos(2 * Math.random() - 1)
			const theta = Math.random() * 2 * Math.PI
			const x = RADIUS * Math.sin(phi) * Math.cos(theta)
			const y = RADIUS * Math.sin(phi) * Math.sin(theta)
			const z = RADIUS * Math.cos(phi)
			arr.push(new THREE.Vector3(x, y, z))
		}
		return arr
	}, [])

	// Animar rotación de toda la red
	useFrame((state) => {
		state.scene.rotation.y += 0.002
	})

	return (
		<group>
			{/* Nodos */}
			{nodes.map((node, idx) => (
				<mesh key={idx} position={node}>
					<sphereGeometry args={[0.07, 8, 8]} />
					<meshBasicMaterial color="#00f0ff" />
				</mesh>
			))}

			{/* Conexiones (líneas) */}
			{nodes.flatMap((a, i) =>
				nodes.slice(i + 1).map((b, j) => {
					const dist = a.distanceTo(b)
					if (dist < CONNECTION_DISTANCE) {
						const points = [a, b]
						const geometry = new THREE.BufferGeometry().setFromPoints(points)
						return (
							<line key={`${i}-${j}`}>
								<bufferGeometry attach="geometry" {...geometry} />
								<lineBasicMaterial
									attach="material"
									color="#00f0ff"
									transparent
									opacity={0.2}
								/>
							</line>
						)
					}
					return null
				})
			)}
		</group>
	)
}
