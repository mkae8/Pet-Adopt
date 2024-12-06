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

import { motion } from "framer-motion";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, string, z } from "zod";
import { toast, useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader } from "@/components/Loader";
import { AnimatePresence } from "framer-motion";

interface Question {
  id: number;
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
  ownerId: {
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
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  createdAt: string;
  updatedAt: string;
}

const Requests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const openModal = (requests: Request) => {
    setSelectedRequest(requests);
  };
  const questions: Question[] = [
    { id: 1, text: "Танд яагаад амьтан үрчлэн авах сонирхол төрсөн бэ?" },
    { id: 2, text: "Таны амьдрах орчин ямар вэ?" },
    { id: 3, text: "Танд өөр амьтад бий юу?" },
    {
      id: 4,
      text: "Өмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ?",
    },
    { id: 5, text: "Өдөр бүр амьтанд хэр их цаг зарцуулах боломжтой вэ?" },
    {
      id: 6,
      text: "Хэрэв та аялалд гарах эсвэл удаан хугацаагаар хол байх шаардлага гарвал амьтандаа хэрхэн анхаарал тавих төлөвлөгөөтэй вэ?",
    },
    {
      id: 7,
      text: "Амьтны хоол, малын эмчид үзүүлэх, яаралтай тусламж зэрэг зардлуудад санхүүгийн хувьд бэлтгэлтэй юу?",
    },
    {
      id: 8,
      text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get(
          `${process.env.BACKEND_URL}/myapplicationForm/${user.user?.id}`
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
  }, [user.isLoaded]);

  const closeModal = () => {
    setSelectedRequest(null);
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
        return "bg-gray-300";
    }
  };

  const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime(); // Difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} секундийн${seconds !== 1 ? "" : ""} өмнө`;
    }
    if (minutes < 60) {
      return `${minutes} минутын${minutes !== 1 ? "" : ""} өмнө`;
    }
    if (hours < 24) {
      return `${hours} цагийн${hours !== 1 ? "" : ""} өмнө`;
    }
    return `${days} өдрийн${days !== 1 ? "" : ""} өмнө`;
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
      <div className=" mt-10 md:mt-16 text-3xl font-bold">
        Таны явуулсан хүсэлтүүд
      </div>
      <div className="w-[350px] sm:w-[400px] lg:w-[950px] md:w-[600px]  rounded-xl mt-2 md:mt-14 relative z-10">
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
                    ? requests.toReversed().map((request, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/3"
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
                                  <div>
                                    {request.petId.petName}
                                    <div className="text-[9px] font-normal">
                                      {timeAgo(request.createdAt)}
                                    </div>
                                  </div>
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                              <Badge
                                className={`${getStatusColor(
                                  request.petId.status
                                )} text-white text-xs h-14 flex justify-center text-center hover:${getStatusColor(
                                  request.petId.status
                                )}`}
                              >
                                {request.petId.status}
                              </Badge>
                              <p className="text-sm pt-2 text-gray-500 text-center h-12 text-wrap truncate">
                                {request.ownerId.username}- руу явуулсан хүсэлт.
                              </p>
                              <Button className="w-full">
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

          <AnimatePresence>
            <Dialog open={selectedRequest !== null} onOpenChange={closeModal}>
              <DialogContent className="z-[100] w-full max-w-[400px] rounded-md sm:max-w-[600px] lg:max-w-[700px] min-w-[300px]">
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
                <ScrollArea className="mt-6 max-h-[40vh] pr-4">
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-4 shadow-sm"
                      >
                        <h3 className="font-semibold text-gray-700 mb-2">
                          {question.text}
                        </h3>
                        <div className="text-gray-600">
                          <div className="text-slate-600">
                            {index == 0 ? selectedRequest?.question1 : ""}
                            {index == 1 ? selectedRequest?.question2 : ""}
                            {index == 2 ? selectedRequest?.question3 : ""}
                            {index == 3 ? selectedRequest?.question4 : ""}
                            {index == 4 ? selectedRequest?.question5 : ""}
                            {index == 5 ? selectedRequest?.question6 : ""}
                            {index == 6 ? selectedRequest?.question7 : ""}
                            {index == 7 ? selectedRequest?.question8 : ""}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="w-3/3 space-y-6 px-5">
                  <div className="mt-4 flex justify-between items-center">
                    <Button onClick={closeModal} className="w-full sm:w-auto">
                      Хаах
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Requests;
