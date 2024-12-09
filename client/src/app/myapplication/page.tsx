"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";

import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  description: z
    .string()
    .max(100, { message: "Description must be no more than 100 characters." }),
});

interface Question {
  id: string;
  text: string;
}

interface Request {
  _id: string;
  petId: {
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
    status: any;
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    authId: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  };
  ownerId: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: string | object | undefined;
}

const Myapplication = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null | any>(
    null
  );
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const openModal = (requests: Request) => {
    setSelectedRequest(requests);
  };
  const questions: Question[] = [
    {
      id: "question1",
      text: "Танд яагаад амьтан үрчлэн авах сонирхол төрсөн бэ?",
    },
    { id: "question2", text: "Таны амьдрах орчин ямар вэ?" },
    { id: "question3", text: "Танд өөр амьтад бий юу?" },
    {
      id: "question4",
      text: "Өмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ?",
    },
    {
      id: "question5",
      text: "Өдөр бүр амьтанд хэр их цаг зарцуулах боломжтой вэ?",
    },
    {
      id: "question6",
      text: "Хэрэв та аялалд гарах эсвэл удаан хугацаагаар хол байх шаардлага гарвал амьтандаа хэрхэн анхаарал тавих төлөвлөгөөтэй вэ?",
    },
    {
      id: "question7",
      text: "Амьтны хоол, малын эмчид үзүүлэх, яаралтай тусламж зэрэг зардлуудад санхүүгийн хувьд бэлтгэлтэй юу?",
    },
    {
      id: "question8",
      text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get(
          `${process.env.BACKEND_URL}/getmyapplication/${user.user?.id}`
        );
        setRequests(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (user.isLoaded) {
      fetchData();
    }

    console.log(selectedRequest);
  }, [user.isLoaded]);

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedRequest((prev: Request) => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (
    status: "Үрчлүүлэх боломжтой" | "Одоогоор хүлээгдэж байгаа" | "Үрчлэгдсэн"
  ) => {
    switch (status) {
      case "Үрчлүүлэх боломжтой":
        return "bg-yellow-500";
      case "Одоогоор хүлээгдэж байгаа":
        return "bg-green-500";
      case "Үрчлэгдсэн":
        return "bg-аgrey-500";
    }
  };
  return (
    <div className="h-[70vh] flex flex-col items-center relative">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          backgroundImage: "url('/wallpaper3.jpeg')",
          zIndex: -1,
        }}
      />
      <div className=" mt-28 text-3xl font-bold">Таны илгээсэн хүсэлтүүд</div>
      <div className="w-[350px] sm:w-[400px] lg:w-[950px] md:w-[600px]  rounded-xl mt-28 relative z-10">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Хүсэлтүүд</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4 ">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-5xl mx-auto"
              >
                <CarouselContent className="pl-2 md:pl-4 lg:basis-1/5 md:basis-1/3">
                  {requests.length !== 0
                    ? requests.map((request, index) => (
                        <CarouselItem
                          key={index}
                          className=" pl-2 md:pl-4 lg:basis-1/5 md:basis-1/3"
                        >
                          <Card
                            className="w-full cursor-pointer hover:shadow-lg"
                            onClick={() => openModal(request)}
                          >
                            <CardHeader>
                              <CardTitle className="flex justify-between items-center">
                                <div className="truncate flex items-center text-sm gap-2">
                                  <Avatar>
                                    <AvatarImage
                                      className="object-cover"
                                      src={request.petId.image[0]}
                                      alt={request.petId.petName}
                                    />
                                  </Avatar>
                                  {request.petId.petName}
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-500 h-12 text-wrap truncate">
                                {request.ownerId} руу хүсэлт илгээсэн байна.
                                {/* Owner name  */}
                              </p>
                              {request.petId.status === "үрчлэгдсэн" ? (
                                <p
                                  className={`${getStatusColor(
                                    request.petId.status
                                  )} text-white text-xs h-10 text-center hover:${getStatusColor(
                                    request.petId.status
                                  )}`}
                                >
                                  {request.petId.status}
                                </p>
                              ) : null}{" "}
                              {/* Optionally render something else if the status is not "үрчлэгдсэн" */}
                              <Button className="mt-4 w-full">
                                Хүсэлтийг харах
                              </Button>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))
                    : "Хүсэлт алга"}
                </CarouselContent>
                {requests.length !== 0 ? (
                  <>
                    <CarouselPrevious /> <CarouselNext />
                  </>
                ) : (
                  ""
                )}
              </Carousel>
            </div>
          )}

          <Dialog open={selectedRequest !== null} onOpenChange={closeModal}>
            <DialogContent className="z-[100] w-full md:min-h-[800px] max-w-[400px] rounded-md sm:max-w-[600px] lg:max-w-[700px] min-w-[300px]">
              <DialogHeader>
                <DialogTitle>{selectedRequest?.userId.username}</DialogTitle>
                <div>
                  <Badge
                    className={`${getStatusColor(
                      selectedRequest?.petId.status || "pending"
                    )} text-white`}
                  >
                    {selectedRequest?.petId.status}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="mt-2 flex flex-col sm:flex-row gap-4">
                <ScrollArea className="md:h-[500px] h-[300px] w-full  border  rounded-md ">
                  <div className="flex flex-col p-5 gap-5">
                    {questions.map((el, index) => {
                      if (index < 7) {
                        return (
                          <div
                            key={index}
                            className="border rounded-sm px-1 py-2"
                          >
                            <h1 className="font-bold">Асуулт {index + 1}</h1>
                            <div>{el.text}</div>
                            <h1 className="font-bold">Хариулт</h1>
                            <Input
                              defaultValue={
                                selectedRequest?.[`question${index + 1}`] || ""
                              }
                              name={el.id}
                              onChange={handleValueChange}
                            />
                            <div className="text-slate-600"></div>
                          </div>
                        );
                      } else if (index === 7) {
                        return (
                          <div
                            key={index}
                            className="border rounded-sm px-1 py-2"
                          >
                            <h1 className="font-bold">Асуулт {index + 1}</h1>
                            <div>{el.text}</div>
                            <h1 className="font-bold">Хариулт</h1>
                            <label className="inline-flex items-center mr-4">
                              <input
                                type="radio"
                                name={`question8_${index}`}
                                value="Тийм"
                                checked={selectedRequest?.question8 === "Тийм"}
                                onChange={() =>
                                  setSelectedRequest((prev: any) => ({
                                    ...prev,
                                    question8: "Тийм",
                                  }))
                                }
                              />
                              <span className="ml-2">Тийм</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name={`question8_${index}`}
                                value="Үгүй"
                                checked={selectedRequest?.question8 === "Үгүй"}
                                onChange={() =>
                                  setSelectedRequest((prevRequest: any) => ({
                                    ...prevRequest,
                                    question8: "Үгүй",
                                  }))
                                }
                              />
                              <span className="ml-2">Үгүй</span>
                            </label>

                            <div className="text-slate-600"></div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </ScrollArea>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button onClick={closeModal} className="w-full sm:w-auto">
                  Хаах
                </Button>
                <Button
                  type="submit"
                  className="bg-green-400"
                  disabled={loading}
                  onClick={() => {
                    console.log(selectedRequest);
                  }}
                >
                  {loading ? "Илгээж байна..." : "Илгээх"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Myapplication;
