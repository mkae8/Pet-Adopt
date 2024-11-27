"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PawPrintIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  MoreVertical,
  Bone,
  Trash2,
  FilePenLine,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";

type status =
  | "Үрчлүүлэх боломжтой"
  | "Одоогоор хүлээгдэж байгаа"
  | "Үрчлэгдсэн";

type CardData = {
  _id: string;
  userId: string;
  petCategoryId: string;
  petName: string;
  image: string[];
  description: string;
  age: number;
  sex: string;
  size: string;
  weight: string;
  location: string;
  status: status;
};

const statusConfig = {
  "Үрчлүүлэх боломжтой": {
    icon: Bone,
    color: "text-primary",
    bg: "bg-yellow-300",
  },
  Үрчлэгдсэн: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-300",
  },
  "Одоогоор хүлээгдэж байгаа": {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
};

export default function CardsStatusPage() {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardData[]>();
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const fetchPet = async () => {
    try {
      const { data } = await axios.get<CardData[]>(
        `${process.env.BACKEND_URL}/pet-get/${user.user?.id}`
      );
      console.log(data);
      if (data.length == 0) {
        setCards(undefined);
      } else {
        setCards(data);
      }
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    const deletePet = async () => {
      try {
        const { data }: any = await axios.post<CardData[]>(
          `${process.env.BACKEND_URL}/petdelete`,
          { id: id }
        );
        console.log(data);
        if (data) {
          toast({
            title: `${data.message}`,
          });
        }
        fetchPet();
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    deletePet();
    console.log(id);
  };
  useEffect(() => {
    console.log(user.isLoaded);
    if (user.isLoaded) {
      fetchPet();
    }
  }, [user.isLoaded]);

  const handleStatusChange = (id: string, newStatus: status) => {
    const updateStatus = async () => {
      try {
        const { data }: any = await axios.post<CardData[]>(
          `${process.env.BACKEND_URL}/statusupdate`,
          { id, newStatus }
        );
        console.log(data);
        if (data) {
          toast({
            title: `${data.message}`,
          });
        }
        fetchPet();
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    updateStatus();

    setCards(
      cards?.map((card) =>
        card._id === id
          ? {
              ...card,
              status: newStatus,
            }
          : card
      )
    );
  };
  const [isOpen, setIsOpen] = useState(false);

  const modalClickHandler = async () => {
    await form.reset();
    setIsOpen((prev) => !prev);
  };

  // modal heseg

  type Category = {
    _id: string;
    categoryName: string;
    categoryLabel: string;
  };

  const [image, setImage] = useState<File | null>(null);
  const [loading1, setLoading1] = useState(false);
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
      description: "",
      location: "",
      weight: "",
      size: undefined,
      sex: undefined,
    },
  });

  const [fetchPetid, setFetchPetid] = useState<string>();
  console.log(categories);
  console.log(cards);

  const handleSubmit = async (data: z.infer<typeof petSchema>) => {
    setLoading1(true);
    const imgData = await uploadImage();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/update/pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: [imgData?.accessUrls],
          id: user.user?.id,
          petId: fetchPetid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: `Мэдээлэл хадгалагдах үед алдаа гарлаа: ${errorData.message}`,
        });
        setLoading1(false);
        return;
      }
      fetchPet();
      setIsOpen(false);
      toast({ title: "Амьтны мэдээлэл амжилттай шинэчлэгдлээ!" });
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Алдаа гарлаа." });
    } finally {
      setLoading1(false);
    }
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const openConfirmDialog = (cardId: any) => {
    setCardToDelete(cardId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      handleDelete(cardToDelete);
      setIsConfirmOpen(false);
      setCardToDelete(null);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading1) {
    return <Loading />;
  }

  return (
    <div className="container bg-orange-50 h-screen mx-auto p-4">
      <h1 className="text-3xl mt-2 mb-2 md:mt-10  font-bold md:mb-6">
        Таны үрчлүүлэх амьтад
      </h1>
      <ScrollArea className="md:h-[100%] h-[80%] w-full md:border-none border  rounded-md ">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards
              ? cards.map((card) => {
                  const {
                    icon: StatusIcon,
                    color,
                    bg,
                  } = statusConfig[card.status];
                  return (
                    <Card key={card._id} className="w-full">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                        <div className=" flex items-center justify-around">
                          <Avatar className="md:w-20 md:h-20">
                            <AvatarImage
                              className="object-cover"
                              src={card.image[0]}
                              alt={card.petName}
                            />
                          </Avatar>
                          <CardTitle className="text-sm  gap-2 ml-2 font-medium">
                            Амьтны нэр : {card.petName}
                            <CardDescription>Нас : {card.age}</CardDescription>
                          </CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="min-w-fit">
                            <DropdownMenuGroup className="w-fit">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setFetchPetid(card._id);
                                  setIsOpen(true);
                                }}
                              >
                                <FilePenLine />
                                <span>Засах</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => openConfirmDialog(card._id)}
                              >
                                <Trash2 />
                                <span> Устгах</span>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className={`p-2 rounded-full ${bg}`}>
                            <StatusIcon className={`h-4 w-4 ${color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Төлөв
                            </p>
                            <p className="text-sm font-semibold capitalize">
                              {card.status}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start space-y-2">
                        <Select
                          onValueChange={(value: status) =>
                            handleStatusChange(card._id, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={card.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Үрчлүүлэх боломжтой">
                              Үрчлүүлэх боломжтой
                            </SelectItem>
                            <SelectItem value="Үрчлэгдсэн">
                              Үрчлэгдсэн
                            </SelectItem>
                            <SelectItem value="Одоогоор хүлээгдэж байгаа">
                              Одоогоор хүлээгдэж байгаа
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </CardFooter>
                    </Card>
                  );
                })
              : "Хоосон байна"}
          </div>
        )}
        <Dialog open={isOpen} onOpenChange={modalClickHandler}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="md:max-w-4xl h-5/6 p-0">
            <ScrollArea className="h-[100%] max-w-4xl rounded-md border">
              <Card className="w-full max-w-4xl mx-auto h-[100%]">
                <CardHeader className="text-center">
                  <DialogHeader>
                    <DialogTitle>
                      <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
                        <PawPrintIcon className="w-8 h-8 mr-2" />
                        Амьтны мэдээлэл засах
                      </CardTitle>
                      <CardDescription>
                        Амьтны дэлгэрэнгүй мэдээллийг оруулна уу
                      </CardDescription>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
                              <Input
                                placeholder="Байршлыг оруулна уу"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <Label htmlFor="picture" className="text-primary">
                          Зураг
                        </Label>
                        <Input
                          id="picture"
                          type="file"
                          onChange={handleFileChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          className="w-4/6"
                          disabled={loading1}
                        >
                          Мэдээлэл илгээх
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Устгах</DialogTitle>
              <DialogDescription>
                Та энэ үйлдлийг хийхэд итгэлтэй байна уу ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Үгүй
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Тийм
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ScrollArea>
    </div>
  );
}
