import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async(
    email: string, 
    token: string,
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirma tu correo electronico",
        html: `<p>Clikea <a href="${confirmLink}">aqui</a> para confirmar</p>`
    })
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Crea tu nueva contraseña!!",
    html: `<p>Clikea <a href="${resetLink}">aqui</a> para cear la nueva contraseña</p>`
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Codigo",
    html: `<p>Tu 2FA codigo: ${token}</p>`,
  });
};
