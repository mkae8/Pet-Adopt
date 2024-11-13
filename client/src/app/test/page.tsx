"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Test = () => {
  const [image, setImage] = useState<File | null>(null);
  const [accessUrl, setAccessUrl] = useState<string | null>(null);

  const getPresignedURL = async () => {
    const { data } = await axios.get("http://localhost:8000/image");
    return data as { uploadUrl: string; accessUrls: string };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const { uploadUrl, accessUrls } = await getPresignedURL();
        await axios.put(uploadUrl, image, {
          headers: { "Content-Type": image.type },
        });
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
          <button onClick={uploadImage} className="btn"></button>
        )}
      </div>
    </div>
  );
};

export default Test;
