"use client";

import { useState } from "react";
import { toast } from "react-toastify";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const PetAddModal = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petCategoryId: "",
    description: "",
    age: "",
    sex: "",
    size: "",
    weight: "",
    location: "",
  });

  const [image, setImage] = useState<File | null>(null);
  // const [accessUrl, setAccessUrl] = useState<string | null>(null);

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
        console.log(data.accessUrls);

        await axios.put(data.uploadUrl, image, {
          headers: { "Content-Type": image.type },
        });

        return data;

        console.log("Image successfully uploaded");
        // setAccessUrl(data.accessUrls);
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

  const { user } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setFormData({
      petName: "",
      petCategoryId: "",
      description: "",
      age: "",
      sex: "",
      size: "",
      weight: "",
      location: "",
    });
    setImage(null);
    setIsOpen(false);
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
      handleClear();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="relative overflow-hidden bg-gradient-to-r bg-inherit text-white font-semibold py-7 px-10 bottom-[480px] right-[580px]
    transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:focus:outline-none focus:ring-4  focus:ring-opacity-50
    group"
        >
          <span className="relative z-10 text-lg text-[20px] font-bold ">
            Үрчлүүлэх амьтны мэдээлэл оруулах
          </span>
          <span
            className="
      absolute inset-0 bg-[#F97316] opacity-20 transform scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-50 origin-left"
          ></span>
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
          <div className="pl-[142px]">
            <Select
              onValueChange={(value) =>
                handleSelectChange("petCategoryId", value)
              }
            >
              <SelectTrigger className="w-[180px]">
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
                <SelectValue placeholder="Статус сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Үрчлүүлэх боломжтой">
                  Үрчлүүлэх боломжтой
                </SelectItem>
                <SelectItem value="  Одоогоор хүлээгдэж байгаа">
                  Одоогоор хүлээгдэж байгаа
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Зураг хадгалагдах</Label>
          <Input id="picture" onChange={handleFileChange} type="file" />
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
              uploadImage();
            }}
            disabled={loading}
            className={`relative ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Илгээж байна...
              </span>
            ) : (
              "Мэдээлэл илгээх"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PetAddPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 relative">
      <img
        src="/PetPage.jpg"
        alt="Pet Background"
        className="w-screen h-screen object-full "
      />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-10 bg-ora">
        <PetAddModal />
      </div>
    </div>
  );
};

export default PetAddPage;
