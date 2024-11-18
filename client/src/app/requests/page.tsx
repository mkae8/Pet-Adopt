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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  id: number;
  name: string;
  userName: string;
  breed: string;
  age: string;
  description: string;
  imageUrl: string;
  status: "pending" | "completed";
  applicationForm: Question[];
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

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      name: "Buddy",
      userName: "temkaa",
      breed: "Golden Retriever",
      age: "3 years",
      description: "Friendly and energetic, loves to play fetch!",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
      status: "pending",
      applicationForm: [
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
      ],
    },
    {
      id: 2,
      name: "Rex",
      breed: "German Shepherd",
      userName: "norov",
      age: "4 years",
      description: "Loyal and protective, great with families.",
      imageUrl:
        "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
      status: "pending",
      applicationForm: [
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
          text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа ууӨмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ??",
        },
      ],
    },
    {
      id: 3,
      name: "Rex",
      breed: "German Shepherd",
      userName: "temkaa",
      age: "4 years",
      description: "Loyal and protective, great with families.",
      imageUrl:
        "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
      status: "pending",
      applicationForm: [
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
          text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа ууӨмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ??",
        },
      ],
    },
    {
      id: 4,
      name: "Fluffy",
      breed: "Persian Cat",
      userName: "temkaa",
      age: "5 years",
      description: "Gentle and quiet, loves to be groomed.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
      status: "completed",
      applicationForm: [
        { id: 1, text: "pigland uzeed" },
        { id: 2, text: "Pigland" },
        { id: 3, text: "Pig" },
        {
          id: 4,
          text: "Norovoo",
        },
        { id: 5, text: "3tsag" },
        {
          id: 6,
          text: "zarna",
        },
        {
          id: 7,
          text: "uzuulkue",
        },
        {
          id: 8,
          text: "baigaa",
        },
      ],
    },
  ]);
  const userid = useUser();

  useEffect(() => {
    console.log(userid);

    // const { data }: any = axios.get(
    //   `http/localhost:8000/applicationForm/:${userid}`
    // );
    // setRequests;
  });

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
    <div className="h-screen flex flex-col items-center justify-around relative">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          backgroundImage: "url('/wallpaper3.jpeg')",
          zIndex: -1,
        }}
      />
      <div className=" mt-20 text-3xl font-bold">Үрчлэгчийн мэдээлэл</div>
      <div className="sm:w-[400px] lg:w-[1000px] md:w-[600px] m-auto rounded-xl  relative z-10">
        <div>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Хүсэлтүүд</h1>
            <div className="flex flex-col gap-4 ">
              {requests.map((request) => (
                <Card
                  key={request.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow md:w-[400px] w-[300px] "
                  onClick={() => openModal(request)}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <div className="truncate flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={request.imageUrl} alt="@petadopt" />
                        </Avatar>
                        {request.name}
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          request.status
                        )} text-white`}
                      >
                        {request.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 truncate">
                      {request.userName}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Dialog open={selectedRequest !== null} onOpenChange={closeModal}>
              {/* max-w-l */}
              <DialogContent className=" z-[100] min-w-[1500px]">
                <DialogHeader>
                  <DialogTitle>{selectedRequest?.userName}</DialogTitle>
                  <div>
                    <Badge
                      className={`${getStatusColor(
                        selectedRequest?.status || "pending"
                      )} text-white`}
                    >
                      {selectedRequest?.status}
                    </Badge>
                  </div>
                </DialogHeader>
                <div className="mt-2 flex">
                  <div className="flex flex-col gap-1">
                    {selectedRequest?.applicationForm.map((el, index) => {
                      return (
                        <div key={el.id} className="border rounded-sm px-1">
                          <h1 className="font-bold">Асуулт {index + 1}</h1>
                          <div className="">{questions[index].text}</div>
                          <h1 className="font-bold">Хариулт</h1>
                          <div className="text-slate-600"> {el.text}</div>
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
        {/* <Application /> */}
      </div>
    </div>
  );
};

export default Requests;
// aa
