"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

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

type Status = "approved" | "rejected" | "pending";

type CardData = {
  id: number;
  title: string;
  description: string;
  status: Status;
  lastChanged: string;
};

const statusConfig = {
  approved: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
  rejected: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100" },
};

const initialCards: CardData[] = [
  {
    id: 1,
    title: "Payment #1234",
    description: "Credit card payment",
    status: "approved",
    lastChanged: "2023-06-15T10:30:00",
  },
  {
    id: 2,
    title: "Refund #5678",
    description: "Product return",
    status: "pending",
    lastChanged: "2023-06-14T14:45:00",
  },
  {
    id: 3,
    title: "Order #9101",
    description: "New purchase",
    status: "rejected",
    lastChanged: "2023-06-13T09:15:00",
  },
  {
    id: 4,
    title: "Subscription #1122",
    description: "Monthly plan",
    status: "approved",
    lastChanged: "2023-06-12T16:20:00",
  },
];

export default function CardsStatusPage() {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  const handleStatusChange = (id: number, newStatus: Status) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              status: newStatus,
              lastChanged: new Date().toISOString(),
            }
          : card
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cards Status</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const { icon: StatusIcon, color, bg } = statusConfig[card.status];
          return (
            <Card key={card.id} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
                <div className="flex items-center space-x-4 mt-4">
                  <div className={`p-2 rounded-full ${bg}`}>
                    <StatusIcon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Status
                    </p>
                    <p className="text-sm font-semibold capitalize">
                      {card.status}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <Select
                  onValueChange={(value: Status) =>
                    handleStatusChange(card.id, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Last changed on{" "}
                  <time dateTime={card.lastChanged}>
                    {new Date(card.lastChanged).toLocaleString()}
                  </time>
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
