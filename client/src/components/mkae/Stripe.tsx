"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Loader2,
  PawPrintIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Pet = {
  _id: string;
  image?: string;
  petName?: string;
  petCategoryId?: string;
  age?: string;
  sex?: string;
  size?: string;
  weight?: string;
  status?: string;
  vaccinated?: string;
  location?: string;
  description?: string;
};

interface StripeProps {
  fetchData: () => void;
  loading: boolean;
  pets: Pet[];
}

export const Stripe = ({ fetchData, loading, pets }: StripeProps) => {
  const { user } = useUser();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 300 : 355;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:py-9 sm:px-6">
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-orange-500 flex items-center gap-2">
            <PawPrintIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Таны нэмсэн амьтад</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-gray-600 flex gap-2">
            Нийт
            <p className="text-orange-500 font-semibold">{pets.length}</p>{" "}
            амьтан бүртгэгдсэн байна.
          </p>
        </CardContent>
      </Card>

      {pets.length === 0 ? (
        <Card>
          <CardContent className="text-center p-6 sm:p-8">
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Та одоогоор ямар ч амьтан нэмээгүй байна.
            </p>
            <Link href="/create-pet">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base">
                <PlusCircle className="w-4 h-4 mr-2" />
                Анхны амьтнаа нэмэх
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-4 sm:gap-6 pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pets.map((pet) => (
              <Card
                key={pet._id}
                className="flex-shrink-0 w-[300px] sm:w-[330px] snap-center"
              >
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-bold text-orange-500">
                    {pet.petName}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="mt-2 text-xs sm:text-sm"
                  >
                    {pet.status || "Статус тодорхойгүй"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={pet.image || "/placeholder.svg?height=300&width=300"}
                      alt={pet.petName || "Амьтны зураг"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
                    {pet.description}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Байршил: {pet.location}
                  </p>
                  {/* <Link href={`/pet/${pet._id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </Link> */}
                </CardFooter>
              </Card>
            ))}
          </div>
          {pets.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
