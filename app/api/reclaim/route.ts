import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadImageToS3 } from "@/lib/s3";
import { reverseGeocode } from "@/lib/mapbox";

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
  };

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("reclaimObject").insertOne(newReclaim);

  return NextResponse.json({ _id: result.insertedId });
}
