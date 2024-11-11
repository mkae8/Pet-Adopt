"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const FileUpload = ({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file); // Сонгосон файлыг эцэг компонент руу илгээх
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-label="File upload"
      />
      <Button onClick={handleUploadClick} className="w-38">
        <Upload className="w-4 h-4 mr-2" />
        Зураг оруулах
      </Button>
      {selectedFile && (
        <p className="mt-4 text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
