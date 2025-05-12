import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!emailSchema.safeParse(email).success) {
    return NextResponse.json({ message: "Email inválido" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // o .db("ob-ladi") si tienes nombre específico
    const collection = db.collection("subscribers");

    const exists = await collection.findOne({ email });

    if (exists) {
      return NextResponse.json({ message: "Ya estás suscrito." }, { status: 200 });
    }

    await collection.insertOne({
      email,
      subscribedAt: new Date(),
    });

    const { error } = await resend.emails.send({
      from: "Obladi <noreply@obladimail.com>", // ⚠️ asegúrate de tener este dominio verificado en Resend
      to: [email],
      subject: "¡Bienvenido a Ob-La-Di!",
      html: `
        <div style="font-family: sans-serif; padding: 1rem;">
          <h2>Gracias por suscribirte 🎉</h2>
          <p>Estás en la lista de correo de Ob-La-Di. Te avisaremos cuando haya novedades.</p>
          <p style="margin-top: 2rem;">– El equipo de Ob-La-Di</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Error al enviar email con Resend:", error);
      return NextResponse.json({ message: "Guardado pero falló el envío del email." }, { status: 202 });
    }

    return NextResponse.json({ message: "¡Gracias por suscribirte! Revisa tu correo 📩" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error interno en subscribe:", error);
    return NextResponse.json({ message: "Error interno", error }, { status: 500 });
  }
}
