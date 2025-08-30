import { Resend } from "resend"
{/*import { DOMAIN_URL } from "./utils";*/}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${process.env.AUTH_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "Ayolin <onboarding@ayolin.com>",
    to: email,
    subject: "Confirma tu correo electrónico",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 20px;">Confirma tu correo electrónico</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Gracias por registrarte en <strong>Ayolin</strong>. Para comenzar a usar tu cuenta, solo necesitas confirmar tu dirección de correo electrónico.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="display: inline-block; padding: 12px 24px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Confirmar correo
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Si no creaste una cuenta, puedes ignorar este correo.
          </p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
          © ${new Date().getFullYear()} Ayolin. Todos los derechos reservados.
        </div>
      </div>
    `
  });
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.AUTH_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Ayolin <onboarding@ayolin.com>",
    to: email,
    subject: "Restablece tu contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 20px;">Restablecer tu contraseña</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Ayolin</strong>. Si fuiste tú, puedes crear una nueva contraseña haciendo clic en el siguiente botón:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Crear nueva contraseña
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Si no solicitaste este cambio, puedes ignorar este correo y tu contraseña actual seguirá siendo válida.
          </p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
          © ${new Date().getFullYear()} Ayolin. Todos los derechos reservados.
        </div>
      </div>
    `
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Ayolin <onboarding@ayolin.com>",
    to: email,
    subject: "Tu código de verificación (2FA)",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 20px;">Código de verificación en dos pasos</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Estás intentando iniciar sesión en tu cuenta de <strong>Ayolin</strong>. Usa el siguiente código para verificar tu identidad:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; padding: 12px 24px; background-color: #111827; color: #ffffff; font-size: 20px; font-weight: bold; border-radius: 6px;">
              ${token}
            </div>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Este código es válido por 10 minutos. Si tú no solicitaste este código, por favor ignora este mensaje.
          </p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
          © ${new Date().getFullYear()} Ayolin. Todos los derechos reservados.
        </div>
      </div>
    `
  });
};

