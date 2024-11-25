"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Pet = {
  _id: string;
  weight: string;
  petName: string;
  age: string;
  sex: string;
  size: string;
  status: string;
  description: string;
  image: string[];
  location: string;
  isVaccined: string;
};

const adoptedPet = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchPets = async () => {
    try {
      const response = await axios.get<Pet[]>(
        `${process.env.BACKEND_URL}/get/pet`
      );
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <div className="container mx-auto p-12">
        <h1 className="text-4xl font-bold text-orange-400 mb-4 text-center">
          Үрчлэгдсэн амьтад
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((el, index) => {
            if (el.status === "Үрчлэгдсэн") {
              return (
                <Card key={index} className="w-full max-w-sm overflow-hidden">
                  {el.image && (
                    <img
                      src={el.image[0]}
                      alt={el.petName}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>Нэр:{el.petName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Нас: {el.age}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="bg-green-400 rounded-lg p-2">
                      {el.status && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {el.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default adoptedPet;
