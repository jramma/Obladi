import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Double } from "mongodb";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/resend";

function generateNickname(name: string, surname: string): string {
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${name.toLowerCase()}${surname
    .toLowerCase()
    .charAt(0)}${randomSuffix}`;
}

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

  function generateNickname(name: string, surname: string): string {
    const normalize = (str: string) =>
      str
        .normalize("NFD") // elimina acentos
        .replace(/[\u0300-\u036f]/g, "") // remueve diacríticos
        .replace(/\s+/g, "") // elimina espacios
        .toLowerCase();

    const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(
      4,
      "0"
    );

    const normalizedName = normalize(name);
    const normalizedSurname = normalize(surname);

    return `${normalizedName}${normalizedSurname.charAt(0)}${randomSuffix}`;
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
    pines: [new ObjectId("6800c61d65abca3a2b8d7ab9")],
    contributor: new Double(0),
    location: "",
    objects: [new ObjectId("000000000000000000000000")],
    verified: false,
    // Nuevos campos
    nickname: generateNickname(name, surname),
    zones: [],
    notifications: [],
    chats: [],
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
