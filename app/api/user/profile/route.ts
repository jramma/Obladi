import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { _id, ...plainUser } = user;

    return NextResponse.json(plainUser);
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { email, description, picture } = body;

  if (!email) {
    return NextResponse.json({ error: "Falta el email" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("users").updateOne(
    { email },
    {
      $set: {
        ...(description && { description }),
        ...(picture !== undefined && { picture }),
      },
    }
  );

  return NextResponse.json({ message: "Usuario actualizado", result });
}
