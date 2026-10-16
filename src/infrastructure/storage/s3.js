import { S3Client } from "@aws-sdk/client-s3";

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS S3 environment variables are missing");
}

export const s3Client = new S3Client({
  region: AWS_REGION,

  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,

    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;