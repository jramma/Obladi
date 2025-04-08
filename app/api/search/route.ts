

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { query, tags, location } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const andFilters: any[] = [];

    if (query && query.length > 1) {
      andFilters.push({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
    }

    if (tags && tags.length > 0) {
      andFilters.push({ tags: { $in: tags } });
    }

    if (location && location.length > 1) {
      andFilters.push({ location: { $regex: location, $options: "i" } });
    }

    // Combina los filtros correctamente
    const filter = andFilters.length > 0 ? { $and: andFilters } : {};

    const results = await db.collection("objects").find(filter).toArray();

    return NextResponse.json({ results });
  } catch (err) {
    console.error("❌ Error en búsqueda:", err);
    return NextResponse.json(
      { results: [], error: "Error interno" },
      { status: 500 }
    );
  }
}
