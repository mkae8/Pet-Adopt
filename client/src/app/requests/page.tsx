"use client";
import Application from "../../components/appComps/ApplicationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
  ownerId: String;
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
}

const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

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

  const [requests, setRequests] = useState<Request[]>([]);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get(
          `http://localhost:8000/applicationForm/${user.user?.id}`
        );

        setRequests(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.isLoaded) {
      fetchData();
    }
  }, [user.isLoaded]);

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const getStatusColor = (status: "pending" | "completed") => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
    }
  };

  return (
    <div className="h-screen flex flex-col items-center relative">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          backgroundImage: "url('/wallpaper3.jpeg')",
          zIndex: -1,
        }}
      />
      <div className=" mt-28 text-3xl font-bold">Үрчлэгчийн мэдээлэл</div>
      <div className="w-[350px] sm:w-[400px] lg:w-[1000px] md:w-[600px]  rounded-xl mt-28 relative z-10">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Хүсэлтүүд</h1>

          <div className="flex flex-col gap-4 ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="pl-2 md:pl-4 md:basis-1/3">
                {requests.map((request, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/3"
                  >
                    <Card
                      className="w-full cursor-pointer hover:shadow-lg"
                      onClick={() => openModal(request)}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <div className="truncate flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={request.petId.image[0]}
                                alt={request.petId.petName}
                              />
                            </Avatar>
                            {request.petId.petName}
                          </div>
                          <Badge
                            className={`${getStatusColor(
                              request.petId.status
                            )} text-white`}
                          >
                            {request.petId.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 truncate">
                          {request.userId.username}
                        </p>
                        <p className="mt-2">{request.petId.description}</p>
                        <Button className="mt-4 w-full">View Details</Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <Dialog open={selectedRequest !== null} onOpenChange={closeModal}>
            {/* max-w-l */}
            <DialogContent className=" z-[100] min-w-[1500px]">
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
              <div className="mt-2 flex">
                <div className="flex flex-col gap-1">
                  {questions.map((el, index) => {
                    return (
                      <div key={index} className="border rounded-sm px-1">
                        <h1 className="font-bold">Асуулт {index + 1}</h1>
                        <div className="">{questions[index].text}</div>
                        <h1 className="font-bold">Хариулт</h1>
                        <div className="text-slate-600">
                          {selectedRequest?.question1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={closeModal}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Requests;
