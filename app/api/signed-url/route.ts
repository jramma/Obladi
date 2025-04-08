

import { NextResponse } from "next/server";
import { getSignedImageUrl } from "@/lib/s3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "No se proporcionó el parámetro 'key'" }, { status: 400 });
  }

  try {
    const url = await getSignedImageUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("❌ Error generando signed URL:", error);
    return NextResponse.json({ error: "No se pudo generar la URL firmada" }, { status: 500 });
  }
}
