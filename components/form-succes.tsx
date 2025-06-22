import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccesProps{
    message?: string
}

export const FormSucces = ({
    message, 
}: FormSuccesProps) => {
    if(!message) return null
    return(
        // No se ven los colores en login-form.tsx
        <div className="flex items-center gap-3 rounded-md border border-green-500 bg-green-100 px-4 py-3 text-green-800 shadow-sm justify-center">
            <CheckCircledIcon className="h-4 w-4"/>
                <p>{message}</p>
        </div>
    )
}