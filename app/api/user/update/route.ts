import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  try {
    console.log("Inicio del handler PUT /api/user/update");

    const body = await req.json();
    console.log("Cuerpo de la solicitud recibido:", body);

    const { email, reclaimedObjects, objects, ...otherUpdates } = body;

    if (!email) {
      console.log("Error: Falta el email en la solicitud.");
      return NextResponse.json({ error: "Falta el email." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const updateOps: any = {};

    if (Object.keys(otherUpdates).length > 0) {
      updateOps.$set = otherUpdates;
    }

    if (reclaimedObjects) {
      updateOps.$push = updateOps.$push || {};
      updateOps.$push.reclaimedObjects = {
        $each: reclaimedObjects.map((id: string) => new ObjectId(id)),
      };
    }

    if (objects) {
      updateOps.$push = updateOps.$push || {};
      updateOps.$push.objects = {
        $each: objects.map((id: string) => new ObjectId(id)),
      };
    }

   const result = await db.collection("users").updateOne({ email }, updateOps);

    console.log("Resultado de la operación updateOne:", result);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Perfil actualizado correctamente" });
  } catch (error: any) {
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
