import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

  const objectIds = ids.map((id: string) => new ObjectId(id));
  const client = await clientPromise;
  const db = client.db();

  const chats = await db
    .collection("chats")
    .find({ _id: { $in: objectIds } })
    .toArray();

  return NextResponse.json({ chats });
}
