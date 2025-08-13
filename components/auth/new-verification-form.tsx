'use client'

import { BeatLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from 'react'

import { newVerification } from '@/actions/new-verification'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/ui/FormError'
import { FormSucces } from '@/components/ui/FormSuccess'

const NewVerificationForm = ({ token }: { token: string }) => {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const onSubmit = useCallback(() => {
		if (success || error) return

		if (!token) {
			setError('Falta el token!')
			return
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
			.catch(() => {
				setError('Algo salio mal!')
			})
	}, [token, success, error])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper
			headerLabel="Estamos confirmando tu correo"
			backButtonLabel="Regresar a Sign In"
			backButtonHref="/auth/login"
		>
			<div className="flex items-center justify-center w-full">
				{!success && !error && <BeatLoader />}
				<FormSucces message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
