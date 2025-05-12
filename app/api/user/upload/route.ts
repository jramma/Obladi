import { NextResponse } from "next/server";
import { uploadImageToS3, getSignedImageUrl } from "@/lib/s3";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const email = formData.get("email");

  if (!file || !email) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    const fileKey = await uploadImageToS3(file, "profile");

    // 🔐 URL firmada solo válida por un tiempo
    const signedUrl = await getSignedImageUrl(fileKey);

    return NextResponse.json({
      imageUrl: fileKey,     // <- guarda solo la key en la DB
      signedUrl,             // <- muestra la URL firmada en el frontend
    });
  } catch (error) {
    console.error("Error al subir imagen a S3:", error);
    return NextResponse.json(
      { error: "Error interno al subir imagen" },
      { status: 500 }
    );
  }
}
