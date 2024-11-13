"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Test = () => {
  const [image, setImage] = useState<File | null>(null);
  const [accessUrl, setAccessUrl] = useState<string | null>(null);

  const getPresignedURL = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/image");
      console.log("Presigned URL data:", data);
      return data as { uploadUrl: string; accessUrls: string };
    } catch (error) {
      console.log("Error fetching presigned URL:", error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const { uploadUrl, accessUrls } = await getPresignedURL();
        console.log("Uploading to:", uploadUrl);

        await axios.put(uploadUrl, image, {
          headers: { "Content-Type": image.type },
        });
        console.log("Image successfully uploaded");

        setAccessUrl(accessUrls);
      } catch (error) {
        console.log("Upload failed:", error);
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col gap-5">
        {accessUrl ? (
          <Image
            width={500}
            height={500}
            alt="Uploaded image"
            src={accessUrl}
          />
        ) : (
          <div>
            <label htmlFor="picture">Picture</label>
            <input id="picture" onChange={handleFileChange} type="file" />
          </div>
        )}
        {image && !accessUrl && (
          <button onClick={uploadImage} className="btn border">
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default Test;