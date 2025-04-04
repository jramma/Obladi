import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { objectId, ownerEmail } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const requesterId = new ObjectId(session.user.id);
  const owner = await db.collection("users").findOne({ email: ownerEmail });

  if (!owner || owner._id.equals(requesterId)) {
    return NextResponse.json({ message: "Chat no válido" }, { status: 400 });
  }

  const objectObjectId = new ObjectId(objectId);

  const existingChat = await db.collection("chats").findOne({
    objectId: objectObjectId,
    participants: { $all: [requesterId.toString(), owner._id.toString()] },
  });

  if (!existingChat) {
    await db.collection("chats").insertOne({
      objectId: objectObjectId,
      participants: [requesterId.toString(), owner._id.toString()],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return NextResponse.json({ success: true });
}
