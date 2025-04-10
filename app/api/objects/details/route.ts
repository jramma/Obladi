import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const collection = "objects";
  let foundObject = null;
  let foundIn = "";

  try {
    const obj = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (obj) {
      foundObject = obj;
      foundIn = collection;
    }
  } catch (err) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  if (!foundObject) {
    return NextResponse.json({ error: "Objeto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ object: foundObject, collection: foundIn });
}
