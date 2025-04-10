import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { query, tags, location } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const filters: any = {
      type: "lost",
    };

    if (location) {
      filters.location = new RegExp(location, "i");
    }

    if (tags?.length) {
      filters.tags = { $in: tags.map((t: string) => new RegExp(t, "i")) };
    }

    if (query) {
      filters.title = { $regex: new RegExp(query, "i") };
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
