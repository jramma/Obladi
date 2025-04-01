import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, surname } = body;

  if (!email || !password || !name || !surname) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "El usuario ya existe" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    name,
    surname,
    authProvider: "credentials",
    authId: "",
    rol: "user",
    phone: "",
    mail: email,
    picture: "",
    description: "",
    time: new Date(),
    pines: [],
    contributor: 0,
    lost: false,
    location: null,
    rewardPins: 0,
    foundObjects: {}
  };

  await db.collection("users").insertOne(newUser);

  return NextResponse.json({ message: "Usuario creado correctamente" });
}
