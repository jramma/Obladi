import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    if (!location) {
      return NextResponse.json(
        { error: "Parámetro 'location' requerido" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Busca objetos perdidos en esa ubicación
    const objects = await db
      .collection("objects")
      .find({
        location: location,
        type: "lost",
      })
      .sort({ post_date: -1 })
      .toArray();

    return NextResponse.json({ objects });
  } catch (error) {
    console.error("❌ Error buscando objetos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
