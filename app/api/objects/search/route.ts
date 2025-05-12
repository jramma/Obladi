import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {
  try {
    const location = req.nextUrl.searchParams.get("location");

    if (!location) {
      return NextResponse.json(
        { error: "Parámetro 'location' requerido" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const objects = await db
      .collection("objects")
      .find({ location, type: "lost" })
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
