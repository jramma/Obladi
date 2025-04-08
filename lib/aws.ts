// lib/aws.ts
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.CUSTOM_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY!,
  },
});
