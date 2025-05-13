import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const emailSchema = z.string().email();

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
      return NextResponse.json(
        { message: "Ya estás suscrito." },
        { status: 200 }
      );
    }

    await collection.insertOne({
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      { message: "¡Gracias por suscribirte!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error interno en subscribe:", error);
    return NextResponse.json(
      { message: "Error interno", error },
      { status: 500 }
    );
  }
}
