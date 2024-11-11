"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Амьтны мэдээлэл нэмэх Modal
const PetAddModal = () => {
  const [formData, setFormData] = useState({
    petName: "",
    image: "",
    description: "",
    age: "",
    sex: "",
    size: "",
    weight: "",
    location: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const missingFields = Object.entries(formData).filter(
      ([key, value]) => !value
    );
    if (missingFields.length > 0) {
      alert("Мэдээлэл дутуу байна. Бүх мэдээллийг бөглөнө үү.");
      return;
    }
    alert("Амьтны мэдээлэл амжилттай хадгалагдлаа!");
    // Мэдээллийг серверт илгээх эсвэл бусад шаардлагатай үйлдлийг энд хийнэ.
  };

  return (
    <Dialog>
      {/* Dialog-г идэвхжүүлэх товч */}
      <DialogTrigger asChild>
        <Button className="bg-transparent border-2 border-current ">
          Үрчлүүлэх амьтны мэдээлэл оруулах
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Амьтны мэдээлэл нэмэх</DialogTitle>
          <DialogDescription>
            Амьтны мэдээллийг оруулсаны дараа илгээх товчийг дараарай 😻
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petName" className="text-right">
              Амьтны нэр
            </Label>
            <Input
              id="petName"
              value={formData.petName}
              onChange={handleChange}
              placeholder="Амьтны нэрийг оруулна уу"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Зурагны холбоос
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Cloudinary ашиглана.!!!"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Тайлбар
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Амьтныг тодорхойлно уу (жишээ нь: өнгө , онцгой шинж тэмдэг гэх мэт...)"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Нас
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Амьтны насыг жилээр оруулна уу"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sex" className="text-right">
              Хүйс
            </Label>
            <Select onValueChange={(value) => handleSelectChange("sex", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Хүйс сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Эр</SelectItem>
                <SelectItem value="Female">Эм</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="size" className="text-right">
              Хэмжээ
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("size", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Хэмжээг сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Жижиг</SelectItem>
                <SelectItem value="Medium">Дунд</SelectItem>
                <SelectItem value="Large">Том</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Жин
            </Label>
            <Input
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Жинг кг-аар оруулна уу"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Байршил
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Байршлыг оруулна уу"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Статус
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Үрчлүүлэх боломжтой</SelectItem>
                <SelectItem value="Pending">
                  Одоогоор хүлээгдэж байгаа
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Мэдээлэл илгээх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Хуудсын үндсэн хэсэг
const PetAddPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 relative">
      <img
        src="/PetPage.png"
        alt="Pet Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-10">
        <PetAddModal />
      </div>
    </div>
  );
};

export default PetAddPage;
