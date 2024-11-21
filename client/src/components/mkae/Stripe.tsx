"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { PlusCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const PetCard = () => {
  const { user } = useUser();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPets = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await axios.get<Pet[]>(
          `${process.env.BACKEND_URL}/pets/user/${user.id}`
        );
        console.log(response);

        setPets(response.data);
      } catch (err) {
        console.log(err);
        toast({
          title: "Алдаа",
          description:
            "Амьтдын мэдээллийг авахад алдаа гарлаа. Дахин оролдоно уу.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-700 flex items-center justify-between">
            <span>Таны нэмсэн амьтад</span>
            <Link href="/petcard">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <PlusCircle className="w-4 h-4 mr-2" />
                Бүх амьтадыг харах
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Нийт {pets.length} амьтан бүртгэгдсэн байна.
          </p>
        </CardContent>
      </Card>

      {pets.length === 0 ? (
        <Card>
          <CardContent className="text-center p-8">
            <p className="text-lg text-gray-600 mb-4">
              Та одоогоор ямар ч амьтан нэмээгүй байна.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Card key={pet._id} className="p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {pet.petName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pet.image && (
                  <img
                    src={pet.image || "/default-image.jpg"}
                    alt={pet.petName || "Амьтны зураг"}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700">{pet.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Байршил: {pet.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
