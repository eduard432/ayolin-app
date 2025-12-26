import NewVerificationForm from '@/components/auth/new-verification-form'

const NewVerificationPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ token: string }>
}) => {
	const token = (await searchParams).token
	return <NewVerificationForm token={token} />
}

export default NewVerificationPage
