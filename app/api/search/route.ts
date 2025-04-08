import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { query, tags, location } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const filter: any = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const results = await db.collection("objects").find(filter).toArray();

    return NextResponse.json({ results });
  } catch (err) {
    console.error("❌ Error en búsqueda:", err);
    return NextResponse.json({ results: [], error: "Error interno" }, { status: 500 });
  }
}
