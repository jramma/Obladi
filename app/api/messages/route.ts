export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { chatId, text } = await req.json();

  if (!chatId || !text) {
    return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("messages").insertOne({
    chatId: new ObjectId(chatId),
    sender: session.user.id,
    text,
    createdAt: new Date(),
  });

  // También puedes actualizar `updatedAt` en la colección `chats` si quieres:
  await db
    .collection("chats")
    .updateOne(
      { _id: new ObjectId(chatId) },
      { $set: { updatedAt: new Date() } }
    );

  revalidatePath(`/profile/chat/${chatId}`);
  return NextResponse.json({
    message: "Mensaje enviado",
    id: result.insertedId,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response(JSON.stringify({ message: "chatId requerido" }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const messages = await db
    .collection("messages")
    .find({ chatId: new ObjectId(chatId) })
    .sort({ createdAt: 1 })
    .toArray();

  return new Response(JSON.stringify({ messages }), {
    headers: { "Content-Type": "application/json" },
  });
}
