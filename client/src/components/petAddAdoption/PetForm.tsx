"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { PawPrintIcon as Paw, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { PetAddLoading } from "@/components/petAddAdoption/PetAddLoading";
import PreviewCard from "./PreviewCard";

const PetForm = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petCategoryId: "",
    description: "",
    age: "",
    sex: "",
    size: "",
    weight: "",
    location: "",
    status: "",
    isVaccined: "",
  });

  console.log(formData);

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const getPresignedURL = async () => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/image`);
      return data as { uploadUrl: string; accessUrls: string };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const data = await getPresignedURL();
        await axios.put(data.uploadUrl, image, {
          headers: { "Content-Type": image.type },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = await uploadImage();

    const missingFields = Object.entries(formData).filter(
      ([_, value]) => !value
    );

    if (missingFields.length > 0) {
      toast.error("Мэдээлэл дутуу байна. Бүх мэдээллийг бөглөнө үү.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/create/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: [data?.accessUrls],
          id: user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Мэдээлэл хадгалагдах үед алдаа гарлаа: ${errorData.message}`
        );
        setLoading(false);
        return;
      }

      toast.success("Амьтны мэдээлэл амжилттай хадгалагдлаа!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="w-full bg-orange-50 border-orange-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-orange-700 flex items-center justify-center">
            <Paw className="w-6 h-6 mr-2 text-orange-500" />
            Амьтны мэдээлэл нэмэх
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="petCategory" className="text-orange-700">
                  Амьтны төрөл
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("petCategoryId", value)
                  }
                >
                  <SelectTrigger className="bg-white border-orange-300 focus:ring-orange-500">
                    <SelectValue placeholder="Амьтны төрөл" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Нохой">Нохой 🐕</SelectItem>
                      <SelectItem value="Муур">Муур 🐈</SelectItem>
                      <SelectItem value="Шувуу">Шувуу 🦜</SelectItem>
                      <SelectItem value="Туулай">Туулай 🐇</SelectItem>
                      <SelectItem value="Мэрэгч">Мэрэгч 🐹</SelectItem>
                      <SelectItem value="Загас">Загас 🐠</SelectItem>
                      <SelectItem value="Мөлхөгч">Мөлхөгч 🐢</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="petName" className="text-orange-700">
                  Амьтны нэр
                </Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="Амьтны нэрийг оруулна уу"
                  className="bg-white border-orange-300 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-orange-700">
                  Нас
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Амьтны насыг жилээр оруулна уу"
                  className="bg-white border-orange-300 focus:ring-orange-500"
                />
              </div>
              <div>
                <Label htmlFor="sex" className="text-orange-700">
                  Хүйс
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("sex", value)}
                >
                  <SelectTrigger className="bg-white border-orange-300 focus:ring-orange-500">
                    <SelectValue placeholder="Хүйс сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Эр</SelectItem>
                    <SelectItem value="Female">Эм</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size" className="text-orange-700">
                  Хэмжээ
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("size", value)}
                >
                  <SelectTrigger className="bg-white border-orange-300 focus:ring-orange-500">
                    <SelectValue placeholder="Хэмжээг сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Жижиг</SelectItem>
                    <SelectItem value="Medium">Дунд</SelectItem>
                    <SelectItem value="Large">Том</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight" className="text-orange-700">
                  Жин
                </Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Жинг кг-аар оруулна уу"
                  className="bg-white border-orange-300 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status" className="text-orange-700">
                  Статус
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="bg-white border-orange-300 focus:ring-orange-500">
                    <SelectValue placeholder="Статус сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Үрчлүүлэх боломжтой">
                      Үрчлүүлэх боломжтой
                    </SelectItem>
                    <SelectItem value="Одоогоор хүлээгдэж байгаа">
                      Одоогоор хүлээгдэж байгаа
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="isVaccined">Вакцинд хамрагдсан эсэх</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("isVaccined", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Статус сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Тийм">Тийм</SelectItem>
                    <SelectItem value="Үгүй">Үгүй</SelectItem>
                    <SelectItem value="Хараахан хийлгэж амжаагүй">
                      Хараахан хийлгэж амжаагүй
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-orange-700">
                Тайлбар
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Амьтныг тодорхойлно уу (Жишээ нь: Үүлдэр, өнгө , онцгой шинж тэмдэг гэх мэт...)"
                className="bg-white border-orange-300 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-orange-700">
                Байршил
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Байршлыг оруулна уу"
                className="bg-white border-orange-300 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="picture" className="text-orange-700">
                Зураг хадгалагдах
              </Label>
              <Input
                id="picture"
                onChange={handleFileChange}
                type="file"
                className="bg-white border-orange-300 focus:ring-orange-500 file:bg-orange-100 file:text-orange-700 file:border-orange-300"
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                handleSubmit();
                uploadImage();
              }}
              disabled={loading}
              className={`relative bg-orange-500 hover:bg-orange-600 text-white ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? <PetAddLoading /> : "Мэдээлэл илгээх"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <PreviewCard pet={formData} />
    </div>
  );
};

export default PetForm;
