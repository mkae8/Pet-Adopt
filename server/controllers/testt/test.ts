import { Response, Request } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const accessKeyId = process.env.ACCESS_KEY_ID;

const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const S3 = new S3Client({
  endpoint:
    "https://79ae06799fa625e2f14cf9c7ddc4eec1.r2.cloudflarestorage.com/pet",
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
  region: "auto",
});
export async function getPresignedUrl(res: Response) {
  const id = v4();

  const url = await getSignedUrl(
    S3,
    new PutObjectCommand({ Bucket: "fooddelivery", Key: id }),
    { expiresIn: 60 * 60 }
  );
  res.send({
    uploadUrl: url,
    accessUrls:
      "https://pub-fc956056e24d4374bc02f28210a03ea5.r2.dev/fooddelivery%2F" +
      id,
  });
}
