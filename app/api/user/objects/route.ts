

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("💾 Cuerpo recibido:", body);

    const { objects } = body;

    const toObjectIdArray = (arr: any) =>
      Array.isArray(arr)
        ? arr.filter(Boolean).map((id) => new ObjectId(id))
        : [];

    const client = await clientPromise;
    const db = client.db();

    const objectDocs = await db
      .collection("objects")
      .find({ _id: { $in: toObjectIdArray(objects) } })
      .toArray();

    // 🧠 Agrupar por tipo
    const lost = objectDocs.filter((obj) => obj.type === "lost");
    const reclaimed = objectDocs.filter((obj) => obj.type === "reclaim");
    const solved = objectDocs.filter((obj) => obj.type === "solved");

    return NextResponse.json({ lost, reclaimed, solved });
  } catch (error) {
    console.error("❌ Error en /api/user/objects:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
