import { Response, Request } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

const S3 = new S3Client({
  endpoint:
    "https://d1e63a97bd9bdf37484760e242740173.r2.cloudflarestorage.com/pet",
  credentials: {
    accessKeyId: "1343dcde52f9ced06a783ea586cdcced",
    secretAccessKey:
      "628f18ebe6af0f7680c0abfc5fc9b455fc777254015a039593b50feee80a9b35",
  },
  region: "auto",
});
export async function getPresignedUrl() {
  const id = v4();
  const url = await getSignedUrl(
    S3,
    new PutObjectCommand({ Bucket: "pet", Key: id }),
    { expiresIn: 60 * 60 }
  );
  return {
    uploadUrl: url,
    accessUrls:
      "https://pub-050e63764f9e43f3af6873e3befa1b28.r2.dev/pet%2F" + id,
  };
}
