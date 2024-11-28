"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2, PawPrintIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { petSchema } from "@/lib/form-schema";
import { Loading } from "../Loading";
import Image from "next/image";

type Category = {
  _id: string;
  categoryName: string;
  categoryLabel: string;
};
interface PetFormProps {
  fetchData: () => void;
}

const PetForm = ({ fetchData }: PetFormProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  let imageArray: string[];
  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/get/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      petName: "",
      age: "",
      description: "",
      location: "",
      weight: "",
    },
  });
  const handleUpload = async () => {
    const { data } = await axios.get<{
      uploadUrl: string[];
      accessUrls: string[];
    }>(`${process.env.BACKEND_URL}/image/${uploadImages.length}`);
    console.log(data);

    const uploadUrls = data.uploadUrl;
    console.log(uploadUrls);

    const accessUrls = data.accessUrls;
    imageArray = data.accessUrls;

    try {
      await Promise.all(
        uploadUrls.map(async (uploadUrl: string, index: number) => {
          await axios.put(uploadUrl, uploadImages[index], {
            headers: {
              "Content-Type": uploadImages[index].type,
            },
          });
        })
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onImageChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        setUploadImages([...uploadImages, file]);

        const newImages = [...images];
        newImages[index] = URL.createObjectURL(event.target.files[0]);
        setImages(newImages);
      }
    };

  const handleSubmit = async (data: z.infer<typeof petSchema>) => {
    setLoading(true);
    const imgData = await handleUpload();

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/create/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: imageArray,
          id: user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: "Мэдээлэл хадгалагдах үед алдаа гарлаа:",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      form.reset();
      setImages([null, null, null]);
      toast({
        title: "Амжилттай",
        description: "Амьтны мэдээлэл амжилттай хадгалагдлаа!",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Мэдээлэл хадгалагдах үед алдаа гарлаа:",
        variant: "destructive",
      });
    } finally {
      fetchData();
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <Loading />
          </div>
        </div>
      )}
      <div className="container mx-auto py-10 ">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
              <PawPrintIcon className="w-8 h-8 mr-2" />
              Амьтны мэдээлэл нэмэх
            </CardTitle>
            <CardDescription>
              Амьтны дэлгэрэнгүй мэдээллийг оруулна уу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
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
                        <FormLabel>Нас</FormLabel>
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
                        <FormLabel>Хүйс</FormLabel>
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
                            <SelectItem value="Эр">Эр</SelectItem>
                            <SelectItem value="Эм">Эм</SelectItem>
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
                        <FormLabel>Хэмжээ</FormLabel>
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
                            <SelectItem value="Жижиг">Жижиг</SelectItem>
                            <SelectItem value="Дунд">Дунд</SelectItem>
                            <SelectItem value="Том">Том</SelectItem>
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
                        <FormLabel>Жин</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Жинг кг-аар оруулна уу"
                            {...field}
                          />
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
                        <FormLabel>Статус</FormLabel>
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
                        <FormLabel>Вакцинд хамрагдсан эсэх</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Тийм">Тийм</SelectItem>
                            <SelectItem value="Үгүй">Үгүй</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тайлбар</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Амьтны тодорхойлно уу (Жишээ нь: Үүлдэр, өнгө, онцгой шинж тэмдэг гэх мэт...)"
                          className="h-32"
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
                <div className="flex gap-[67px]">
                  {images.map((image, index) => (
                    <div key={index}>
                      <label key={index}>
                        <input type="file" onChange={onImageChange(index)} />
                        <div className="border relative rounded-sm h-[185px] flex items-center justify-center w-[185px] border-black">
                          <h1 className="flex items-center">ЗУРАГ НЭМЭХ + </h1>
                          {image && (
                            <Image
                              src={image}
                              fill
                              className="absolute object-cover rounded-sm"
                              alt="image"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Мэдээлэл илгээх
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PetForm;
