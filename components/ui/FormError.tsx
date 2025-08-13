import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
	message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null
	return (
		<div className="flex items-center gap-3 rounded-md border border-red-500 bg-red-100 px-4 py-3 text-red-800 shadow-sm justify-center">
			<ExclamationTriangleIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	)
}
