import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadImageToS3 } from "@/lib/s3";
import { reverseGeocode } from "@/lib/mapbox";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const tags = formData
    .get("tags")?.toString()
    .split(",")
    .map((tag) => tag.trim());
  const category = formData.get("category")?.toString();
  const email = formData.get("email")?.toString();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const lostAt = new Date(formData.get("lostAt") as string);
  const post_date = new Date();

  const locationName = await reverseGeocode(latitude, longitude);

  const images: File[] = formData.getAll("images") as File[];
  const uploadedKeys = await Promise.all(
    images.slice(0, 3).map((file) => uploadImageToS3(file, "lost"))
  );

  const newLost = {
    title,
    description,
    tags,
    category,
    email,
    location: locationName,
    latitude,
    longitude,
    date: lostAt,
    post_date,
    imgs: uploadedKeys,
  };

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("lostObjects").insertOne(newLost);
  const newLostId = result.insertedId;

  // Ahora actualizamos el usuario con el nuevo objeto perdido
  await db.collection("users").updateOne(
    { email },
    { $push: { lostObjects: new ObjectId(newLostId) } }
  );

  return NextResponse.json({ _id: newLostId });
}
