

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadImageToS3 } from "@/lib/s3";
import { reverseGeocode } from "@/lib/mapbox";
import { ObjectId } from "mongodb";
import { MongoUser } from "@/lib/utils";

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
    type: "lost",
  };

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("objects").insertOne(newLost);
  const newLostId = result.insertedId;

  // 🔄 Actualizar el usuario con el nuevo objeto perdido
  const usersCollection = db.collection<MongoUser>("users");

  const user = await usersCollection.findOneAndUpdate(
    { email },
    {
      $push: {
        objects: new ObjectId(newLostId),
      },
    },
    { returnDocument: "after" }
  );

  const lostUserId = user.value?._id?.toString();

  // 🔍 Buscar coincidencias tipo reclaim en Objects
  const possibleMatches = await db
    .collection("objects")
    .find({
      type: "reclaim",
      category,
      tags: { $in: tags },
    })
    .toArray();

  for (const match of possibleMatches) {
    const otherUser = await usersCollection.findOne({ email: match.email });
    const otherUserId = otherUser?._id?.toString();

    if (!otherUserId || otherUserId === lostUserId) continue;

    const existingChat = await db.collection("chats").findOne({
      objectId: newLostId,
      participants: { $all: [lostUserId, otherUserId] },
    });

    if (!existingChat) {
      await db.collection("chats").insertOne({
        participants: [lostUserId, otherUserId],
        objectId: newLostId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return NextResponse.json({ _id: newLostId });
}
