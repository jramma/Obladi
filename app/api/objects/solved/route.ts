 

// app/api/objects/mark-as-found/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
  try {
    const { objectId } = await req.json();

    if (!objectId) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("objects")
      .updateOne({ _id: new ObjectId(objectId) }, { $set: { type: "solved" } });

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: "Objeto actualizado con éxito" });
    } else {
      return NextResponse.json(
        {
          error: "No se encontró el objeto o ya estaba marcado como entregado",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("❌ Error actualizando objeto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
