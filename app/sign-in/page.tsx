'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
    const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ? error.message : null);
      return;
    }

    // Redirección manual
    router.push("/dashboard")
  }

	return (
		<form onSubmit={handleLogin}>
			<input
				type="email"
				placeholder="Correo"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<input
				type="password"
				placeholder="Contraseña"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<button disabled={loading}>
				{loading ? 'Entrando...' : 'Iniciar sesión'}
			</button>

			{error && <p>{error}</p>}
		</form>
	)
}

export default Page
