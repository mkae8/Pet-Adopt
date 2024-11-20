"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { PawPrintIcon as Paw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { petSchema } from "@/lib/form-schema";
import { Loading } from "../Loading";

type Category = {
  _id: string;
  categoryName: string;
  categoryLabel: string;
};

const PetForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);

  const getPresignedURL = async () => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/image`);
      return data as { uploadUrl: string; accessUrls: string };
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const data: any = await getPresignedURL();
        await axios.put(data.uploadUrl, image, {
          headers: { "Content-Type": image.type },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/get/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      getCategories();
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      petName: "",
      age: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof petSchema>) => {
    setLoading(true);
    const imgData = await uploadImage();
    console.log(data);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/create/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: [imgData?.accessUrls],
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
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen ">
      <div className="grid grid-cols-1   lg:grid-cols-2 gap-8 ">
        <Card className=" m-auto flex justify-center items-center flex-col bg-orange-50 border-orange-200 shadow-lg ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-orange-700 flex items-center justify-center">
              <Paw className="w-6 h-6 mr-2 text-orange-500" />
              Амьтны мэдээлэл нэмэх
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="petCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Амьтны төрөл</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Амьтны төрөл" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.categoryLabel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Амьтны нэр</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Амьтны нэрийг оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Нас</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Амьтны насыг жилээр оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Хүйс</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Хүйс сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Эр</SelectItem>
                        <SelectItem value="Female">Эм</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Хэмжээ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Хэмжээг сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Small">Жижиг</SelectItem>
                        <SelectItem value="Medium">Дунд</SelectItem>
                        <SelectItem value="Large">Том</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Жин</FormLabel>
                    <FormControl>
                      <Input placeholder="Жинг кг-аар оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Статус</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Статус сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Үрчлүүлэх боломжтой">
                          Үрчлүүлэх боломжтой
                        </SelectItem>
                        <SelectItem value="Одоогоор хүлээгдэж байгаа">
                          Одоогоор хүлээгдэж байгаа
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVaccined"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Вакцинд хамрагдсан эсэх</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Статус сонгоно уу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Тийм">Тийм</SelectItem>
                        <SelectItem value="Үгүй">Үгүй</SelectItem>
                        <SelectItem value="Хараахан хийлгэж амжаагүй">
                          Хараахан хийлгэж амжаагүй
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тайлбар</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Амьтны тодорхойлно уу (Жишээ нь: Үүлдэр, өнгө , онцгой шинж тэмдэг гэх мэт...)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байршил</FormLabel>
                    <FormControl>
                      <Input placeholder="Байршлыг оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" disabled={loading}>
                Мэдээлэл илгээх
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default PetForm;
