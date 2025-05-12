import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: obtener los detalles de los pines del usuario
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user || !user.pines || user.pines.length === 0) {
      return NextResponse.json([]);
    }

    const pinesDetails = await db
      .collection("pins")
      .find({ _id: { $in: user.pines.map((id: string) => new ObjectId(id)) } })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(pinesDetails);
  } catch (err) {
    console.error("Error fetching pines:", err);
    return NextResponse.json({ message: "Error fetching pines" }, { status: 500 });
  }
}

// POST: crear un nuevo pin para el usuario autenticado
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { reason } = await req.json();

  if (!reason) {
    return NextResponse.json({ message: "Falta el motivo del pin" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Crear nuevo pin
    const newPin = {
      userId: user._id,
      reason,
      date: new Date(),
    };

    const result = await db.collection("pins").insertOne(newPin);

    // Actualizar usuario añadiendo el ID del pin
    await db.collection("users").updateOne(
      { _id: user._id },
      { $push: { pines: result.insertedId.toString() } }
    );

    return NextResponse.json({ message: "Pin creado", pinId: result.insertedId });
  } catch (err) {
    console.error("Error creating pin:", err);
    return NextResponse.json({ message: "Error creating pin" }, { status: 500 });
  }
}
