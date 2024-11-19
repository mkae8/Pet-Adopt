"use client";

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type status =
  | "Үрчлүүлэх боломжтой"
  | "  Одоогоор хүлээгдэж байгаа"
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
  Үрчлэгдсэн: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-300",
  },
  "Үрчлүүлэх боломжтой": {
    icon: Bone,
    color: "text-primary",
    bg: "bg-yellow-300",
  },
  "  Одоогоор хүлээгдэж байгаа": {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
};

export default function CardsStatusPage() {
  const { push } = useRouter();
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
    console.log(id, newStatus);
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

  const [showStatusBar, setShowStatusBar] = useState<any>(true);
  const [showPanel, setShowPanel] = useState<any>(false);

  return (
    <div className="container h-screen mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Таны үрчлүүлэх амьтад</h1>
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
                              onClick={() => {}}
                            >
                              <FilePenLine />
                              <span>Засах</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                handleDelete(card._id);
                              }}
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
                          <SelectItem value="Үрчлэгдсэн">Үрчлэгдсэн</SelectItem>
                          <SelectItem value="  Одоогоор хүлээгдэж байгаа">
                            Одоогоор хүлээгдэж байгаа
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </CardFooter>
                  </Card>
                );
              })
            : "odoogoor hooson bna"}
        </div>
      )}
    </div>
  );
}
