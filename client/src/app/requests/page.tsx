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

interface Request {
  id: number;
  title: string;
  status: "pending" | "completed";
  description: string;
}

const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const openModal = (request: Request) => {
    setSelectedRequest(request);
  };

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      title: "New Feature Request",
      status: "pending",
      description: "Add dark mode to the application",
    },
    {
      id: 2,
      title: "Bug Report",
      status: "pending",
      description: "Fix login issue on mobile devices",
    },
    {
      id: 3,
      title: "Performance Improvement",
      status: "completed",
      description: "Optimize database queries for faster load times",
    },
    {
      id: 4,
      title: "UI Enhancement",
      status: "pending",
      description: "Redesign the dashboard for better user experience",
    },
    {
      id: 5,
      title: "Security Update",
      status: "pending",
      description: "Implement two-factor authentication",
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
                      <div className="truncate">{request.title}</div>
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
                      {request.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Dialog open={selectedRequest !== null} onOpenChange={closeModal}>
              <DialogContent className="sm:max-w-[425px] z-[100]">
                <DialogHeader>
                  <DialogTitle>{selectedRequest?.title}</DialogTitle>
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
                <ScrollArea className="mt-2 max-h-[60vh]">
                  <div>{selectedRequest?.description}</div>
                </ScrollArea>
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
