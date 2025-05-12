 

import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./aws";
import { randomUUID } from "crypto";

export async function uploadImageToS3(
  file: File,
  folder: "reclaim" | "lost" | "profile" = "reclaim"
) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${folder}/${randomUUID()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);
  return fileName; // esto es la Key que luego guardas en la DB
}

export async function getSignedImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 }); // 60s
}
