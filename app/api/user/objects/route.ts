import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("💾 Cuerpo recibido:", body);
  
      const { lostObjects, foundObjects, reclaimedObjects } = body;
  
      const toObjectIdArray = (arr: any) =>
        Array.isArray(arr) ? arr.filter(Boolean).map((id) => new ObjectId(id)) : [];
  
      const client = await clientPromise;
      const db = client.db();
  
      const [lost, found, reclaimed] = await Promise.all([
        db.collection("lostObjects").find({ _id: { $in: toObjectIdArray(lostObjects) } }).toArray(),
        db.collection("reclaimObject").find({ _id: { $in: toObjectIdArray(foundObjects) } }).toArray(),
        db.collection("reclaimObject").find({ _id: { $in: toObjectIdArray(reclaimedObjects) } }).toArray(),
      ]);
  
      return NextResponse.json({ lost, found, reclaimed });
    } catch (error) {
      console.error("❌ Error en /api/user/objects:", error);
      return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  }
  