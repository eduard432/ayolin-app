import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async(
    email: string, 
    token: string,
) => {
    const confirmLink = `https://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirma tu correo electronico",
        html: `<p>Clikea <a href="${confirmLink}">aqui</a> para confirmar</p>`
    })
}