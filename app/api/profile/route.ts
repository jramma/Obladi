 

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, description, picture } = body;

  if (!email) {
    return NextResponse.json({ error: "Falta el email" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("users").updateOne(
    { email },
    {
      $set: {
        ...(description && { description }),
        ...(picture !== undefined && { picture }),
      },
    }
  );

  return NextResponse.json({ message: "Usuario actualizado", result });
}
