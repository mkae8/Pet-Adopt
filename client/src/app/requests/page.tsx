"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  PawPrint,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loading } from "@/components/Loading";

const FormSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Утасны дугаар шаардлагатай." }),
  description: z.string().max(2000, {
    message: "Тодорхойлолт 2000 тэмдэгтээс хэтрэхгүй байх ёстой.",
  }),
});

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
    status: "Үрчлүүлэх боломжтой" | "Одоогоор хүлээгдэж байгаа" | "Үрчлэгдсэн";
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
  createdAt: string;
  updatedAt: string;
}

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
  { id: 8, text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?" },
];

export default function AdoptionRequests() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user.isLoaded && user.user?.id) {
        try {
          const { data } = await axios.get<Request[]>(
            `${process.env.BACKEND_URL}/applicationForm/${user.user.id}`
          );
          setRequests(data);
        } catch (error) {
          console.error("Failed to fetch requests:", error);
          toast({
            title: "Error",
            description: "Failed to load requests. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user.isLoaded, user.user?.id, toast]);

  const openModal = (request: Request) => setSelectedRequest(request);
  const closeModal = () => setSelectedRequest(null);

  const sendEmail = async (data: z.infer<typeof FormSchema>) => {
    if (!selectedRequest || !user.user?.primaryEmailAddress?.emailAddress)
      return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/sendMailer`,
        {
          email: selectedRequest.userId.email,
          phone: data.phoneNumber,
          description: data.description,
          petName: selectedRequest.petId.petName,
          petId: selectedRequest.petId._id,
          senderEmail: user.user.primaryEmailAddress.emailAddress,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Амжилттай",
          description: "И-мэйл илгээлээ",
        });
        form.reset();
        closeModal();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: "И-мэйл илгээхэд алдаа гарлаа",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => sendEmail(data);

  const getStatusColor = (status: Request["petId"]["status"]) => {
    switch (status) {
      case "Үрчлүүлэх боломжтой":
        return "bg-yellow-500";
      case "Одоогоор хүлээгдэж байгаа":
        return "bg-green-500";
      case "Үрчлэгдсэн":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} секундийн өмнө`;
    if (minutes < 60) return `${minutes} минутын өмнө`;
    if (hours < 24) return `${hours} цагийн өмнө`;
    return `${days} өдрийн өмнө`;
  };

  const nextRequest = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const prevRequest = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          <PawPrint className="inline-block mr-2 text-orange-500" />
          Үрчлэгчийн мэдээлэл
        </h1>

        {loading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Одоогоор хүсэлт байхгүй байна.
          </p>
        ) : (
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex justify-center overflow-x-auto pb-6 px-4 -mx-4 scrollbar-hide"
            >
              <div className="flex space-x-4">
                {requests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-72 flex-shrink-0"
                  >
                    <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                      <CardHeader className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4">
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-xl font-bold truncate">
                            {request.petId.petName}
                          </span>
                          <Badge
                            className={`${getStatusColor(
                              request.petId.status
                            )} text-white px-2 py-1 text-xs`}
                          >
                            {request.petId.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-12 w-12 rounded-full border-2 border-orange-500">
                            <AvatarImage
                              src={request.petId.image[0]}
                              alt={request.petId.petName}
                            />
                          </Avatar>
                          <div className="ml-4">
                            <p className="text-sm font-semibold truncate">
                              {request.userId.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {timeAgo(request.createdAt)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 p-4">
                        <Button
                          className="w-full"
                          onClick={() => openModal(request)}
                        >
                          Хүсэлтийг харах
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            {requests.length > 4 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md z-10"
                  onClick={prevRequest}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md z-10"
                  onClick={nextRequest}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <Dialog open={true} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
                  <span>Хүсэлтийн дэлгэрэнгүй</span>
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="mt-6 max-h-[60vh] pr-4">
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
                      <p className="text-gray-600">
                        {(() => {
                          const value =
                            selectedRequest[
                              `question${index + 1}` as keyof Request
                            ];
                          return typeof value === "string" ? value : "N/A";
                        })()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-6"
                >
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Утасны дугаар</FormLabel>
                        <FormControl>
                          <Input placeholder="Утасны дугаар" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нэмэлт мэдээлэл</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Нэмэлт мэдээлэл оруулна уу"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Илгээж байна...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Имэйл илгээх
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
