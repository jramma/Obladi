import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(req: Request) {
  try {
    console.log("Inicio del handler PUT /api/user/update");

    const body = await req.json();
    console.log("Cuerpo de la solicitud recibido:", body);

    const { email, ...updates } = body;
    console.log("Email extraído:", email);
    console.log("Actualizaciones extraídas:", updates);

    if (!email) {
      console.log("Error: Falta el email en la solicitud.");
      return NextResponse.json({ error: "Falta el email." }, { status: 400 });
    }

    const client = await clientPromise;
    console.log("Conexión a MongoDB establecida.");

    const db = client.db();
    console.log("Base de datos seleccionada.");

    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: updates });
    console.log("Resultado de la operación updateOne:", result);

    if (result.matchedCount === 0) {
      console.log("Error: Usuario no encontrado.");
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    console.log("Perfil actualizado correctamente.");
    return NextResponse.json({ message: "Perfil actualizado." });
  } catch (error:any) {
    console.error("❌ Error en PUT /api/user/update:", error);

    if (error.code === 121 && error.errInfo) {
      console.error(
        "🔍 Detalle de validación fallida:",
        JSON.stringify(error.errInfo, null, 2)
      );
    }

    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
