import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
    return(
       <CardWrapper
            headerLabel="Bienvenido de vuelta"
            backButtonLabel="Ya tienes una cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
        Login form
       </CardWrapper>
    )
}