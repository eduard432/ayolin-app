import { LoginForm } from '@/components/auth/login-form'

const LoginPage = async ({ searchParams }: {searchParams: Promise<{error: string}>}) => {
  const error = (await searchParams).error
	return <LoginForm error={error} />
}

export default LoginPage
