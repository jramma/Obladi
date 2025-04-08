import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: "noreply@jramma.com",
    to: email,
    subject: "Verifica tu correo",
    html: `
      <p>Gracias por registrarte.</p>
      <p>Por favor, verifica tu email haciendo clic en el siguiente enlace:</p>
      <a href="${url}">Verificar cuenta</a>
      <p>Este enlace expirará en 30 minutos.</p>
    `,
  });
}
