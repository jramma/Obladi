import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { query, tags, location, email } = await req.json();

    const isQueryEmpty = !query || query.trim() === "";
    const areTagsEmpty = !tags || !Array.isArray(tags) || tags.length === 0;
    const isLocationEmpty = !location || location.trim() === "";

    if (isQueryEmpty && areTagsEmpty && isLocationEmpty) {
      return NextResponse.json(
        { error: "Debes proporcionar al menos un criterio de búsqueda." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const filters: any = {
      type: "lost",
    };

    if (!isLocationEmpty) {
      filters.location = new RegExp(location, "i");
    }

    if (!areTagsEmpty) {
      filters.tags = { $in: tags.map((t: string) => new RegExp(t, "i")) };
    }

    if (!isQueryEmpty) {
      filters.title = { $regex: new RegExp(query, "i") };
    }

    if (email) {
      filters.email = { $ne: email }; // 👈 excluir objetos del propio usuario
    }

    const objects = await db
      .collection("objects")
      .find(filters)
      .sort({ post_date: -1 })
      .toArray();

    return NextResponse.json({ results: objects });
  } catch (error) {
    console.error("❌ Error en búsqueda:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
