

import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Double } from "mongodb";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, surname, token } = body;

  if (!email || !password || !name || !surname || !token) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios o el CAPTCHA no se completó" },
      { status: 400 }
    );
  }

  // ✅ Verificación de hCaptcha
  const captchaRes = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET!,
      response: token,
    }),
  });

  const captchaData = await captchaRes.json();

  if (!captchaData.success) {
    return NextResponse.json(
      { error: "Verificación hCaptcha fallida." },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "El usuario ya existe" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    name,
    surname,
    authProvider: "credentials",
    authId: "",
    rewardPins: new Double(0),
    role: "user",
    phone: "",
    picture: "",
    description: "",
    time: new Date(),
    pines: [new ObjectId("000000000000000000000000")],
    contributor: new Double(0),
    location: "",
    objects: [new ObjectId("000000000000000000000000")],
    verified: false,
  };

  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await db.collection("emailVerifications").insertOne({
      email,
      token: verificationToken,
      expires: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
    });
    await sendVerificationEmail(email, verificationToken);

    await db.collection("users").insertOne(newUser);
    return NextResponse.json({ message: "Usuario creado correctamente" });
  } catch (error: any) {
    console.error("❌ Error al insertar el usuario:", error);
    if (error.code === 121 && error.errInfo) {
      console.error(
        "🧾 Detalle errInfo:",
        JSON.stringify(error.errInfo, null, 2)
      );
    }
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
