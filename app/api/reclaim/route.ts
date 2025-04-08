import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadImageToS3 } from "@/lib/s3";
import { reverseGeocode } from "@/lib/mapbox";
import { MongoUser } from "@/lib/utils"; // <-- ajusta la ruta a tu proyecto

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const tags = formData
    .get("tags")
    ?.toString()
    .split(",")
    .map((tag) => tag.trim());
  const category = formData.get("category")?.toString();
  const email = formData.get("email")?.toString();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const foundAt = new Date(formData.get("foundAt") as string);
  const claimedAt = new Date();

  const locationName = await reverseGeocode(latitude, longitude);

  const images: File[] = formData.getAll("images") as File[];
  const uploadedKeys = await Promise.all(
    images.slice(0, 3).map((file) => uploadImageToS3(file))
  );

  const newReclaim = {
    title,
    description,
    tags,
    category,
    email,
    latitude,
    longitude,
    foundAt,
    claimedAt,
    images: uploadedKeys,
    location: locationName,
    type: "reclaim",
  };

  const client = await clientPromise;
  const db = client.db();

  const reclaimResult = await db.collection("reclaimObject").insertOne(newReclaim);
  const reclaimObjectId = reclaimResult.insertedId;

  // 🧠 Buscar al usuario que está reclamando
  const usersCollection = db.collection<MongoUser>("users");
  const user = await usersCollection.findOneAndUpdate(
    { email },
    { $push: { reclaimedObjects: reclaimObjectId } },
    { returnDocument: "after" }
  );

  const claimedById = user.value?._id?.toString();

  // 🔍 Buscar coincidencias en objetos perdidos
  const possibleMatches = await db.collection("objects").find({
    category,
    tags: { $in: tags },
  }).toArray();

  for (const match of possibleMatches) {
    const ownerId = match.email;
    const objectId = match._id;

    // Buscar ID del usuario dueño del objeto perdido
    const lostUser = await db.collection("users").findOne({ email: ownerId });
    const lostUserId = lostUser?._id?.toString();

    if (!claimedById || !lostUserId || claimedById === lostUserId) continue;

    const existingChat = await db.collection("chats").findOne({
      objectId,
      participants: { $all: [claimedById, lostUserId] },
    });

    if (!existingChat) {
      await db.collection("chats").insertOne({
        participants: [claimedById, lostUserId],
        objectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return NextResponse.json({ _id: reclaimObjectId });
}
