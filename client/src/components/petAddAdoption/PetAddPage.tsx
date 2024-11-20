"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
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
import { PetAddLoading } from "./PetAddLoading";

const Test = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petCategoryId: "",
    description: "",
    age: "",
    sex: "",
    size: "",
    weight: "",
    location: "",
    isVaccined: "",
  });
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
  console.log(formData);

  return (
    <Card className="w-full h-full max-w-lg mx-auto p-4 ">
      <CardHeader>
        <CardTitle>Амьтны мэдээлэл нэмэх</CardTitle>
        <CardDescription>
          Амьтны мэдээллийг оруулсаны дараа илгээх товчийг дараарай 😻
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="petCategory">Амьтны төрөл</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("petCategoryId", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Амьтны төрөл" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="67318ef682933a1de42fa5d9">
                    Нохой 🐕
                  </SelectItem>
                  <SelectItem value="67318f2082933a1de42fa5db">
                    Муур 🐈
                  </SelectItem>
                  <SelectItem value="673575da1ecf70ca44174ba2">
                    Шувуу 🦜
                  </SelectItem>
                  <SelectItem value="67318fc782933a1de42fa5dd">
                    Туулай 🐇
                  </SelectItem>
                  <SelectItem value="67318fcc82933a1de42fa5df">
                    Мэрэгч 🐹
                  </SelectItem>
                  <SelectItem value="6735760a1ecf70ca44174ba6">
                    Загас 🐠
                  </SelectItem>
                  <SelectItem value="673576141ecf70ca44174ba8">
                    Мөлхөгч 🐢
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="petName">Амьтны нэр</Label>
            <Input
              id="petName"
              value={formData.petName}
              onChange={handleChange}
              placeholder="Амьтны нэрийг оруулна уу"
            />
          </div>
          <div>
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Амьтныг тодорхойлно уу (Жишээ нь: Үүлдэр, өнгө , онцгой шинж тэмдэг гэх мэт...)"
            />
          </div>
          <div>
            <Label htmlFor="age">Нас</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Амьтны насыг жилээр оруулна уу"
            />
          </div>

          <div>
            <Label htmlFor="sex">Хүйс</Label>
            <Select onValueChange={(value) => handleSelectChange("sex", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Хүйс сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Эр</SelectItem>
                <SelectItem value="Female">Эм</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Хэмжээ</Label>
            <Select
              onValueChange={(value) => handleSelectChange("size", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Хэмжээг сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Жижиг</SelectItem>
                <SelectItem value="Medium">Дунд</SelectItem>
                <SelectItem value="Large">Том</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Жин */}
          <div>
            <Label htmlFor="weight">Жин</Label>
            <Input
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Жинг кг-аар оруулна уу"
            />
          </div>

          {/* Байршил */}
          <div>
            <Label htmlFor="location">Байршил</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Байршлыг оруулна уу"
            />
          </div>

          {/* Статус */}
          <div>
            <Label htmlFor="status">Статус</Label>
            <Select
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
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
          {/* Вакцин */}
          <div>
            <Label htmlFor="isVaccined">Вакцинд хамрагдсан эсэх</Label>
            <Select
              onValueChange={(value) => handleSelectChange("isVaccined", value)}
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

          {/* Зураг */}
          <div>
            <Label htmlFor="picture">Зураг хадгалагдах</Label>
            <Input id="picture" onChange={handleFileChange} type="file" />
          </div>

          {/* Илгээх товч */}
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
              uploadImage();
            }}
            disabled={loading}
            className={`relative ${loading ? "cursor-not-allowed" : ""}`}
          >
            {loading ? <PetAddLoading /> : "Мэдээлэл илгээх"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/PetPage.jpg')` }}
        aria-hidden="true"
      />
      <div className="relative left-0 my-5  sm:px-6">
        <Test />
      </div>
    </div>
  );
};

export default PetAddPage;
