"use client";

import { useEffect, useState, useRef } from "react";
import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart, PawPrint } from "lucide-react";

type Pet = {
  _id: string;
  userId: string;
  weight: string;
  petName: string;
  age: string;
  sex: string;
  size: string;
  status: string;
  description: string;
  image: string[];
  petCategoryId: PetCategory;
  location: string;
  isVaccined: string;
};

type PetCategory = {
  categoryNames: string;
  // categoryName: string;
  imageUrl: string;
};

const categories: PetCategory[] = [
  { categoryNames: "бүгд", imageUrl: "🐾" },
  { categoryNames: "нохой", imageUrl: "🐶" },
  { categoryNames: "муур", imageUrl: "🐱" },
  { categoryNames: "шувуу", imageUrl: "🦜" },
  { categoryNames: "туулай", imageUrl: "🐰" },
  { categoryNames: "мэрэгч", imageUrl: "🐹" },
  { categoryNames: "загас", imageUrl: "🐠" },
];

const Petcard = () => {
  const { toast } = useToast();
  const data = useUser();
  const { push } = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [sliceCount, setSliceCount] = useState(8);
  const [pets, setPets] = useState<Pet[]>([]);
  const [animalFilter, setAnimalFilter] = useState("");

  const filterHandler = (categoryNames: string) => {
    setAnimalFilter(categoryNames);
  };

  const fetchPets = async () => {
    try {
      const response = await axios.get<Pet[]>(
        `${process.env.BACKEND_URL}/get/pet`
      );
      setPets(response.data);
      console.log(response.data, "sdasdasdasfasdafwegha");
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
  };
  const closeModal = () => {
    setSelectedPet(null);
  };

  const handleAdoptClick = (petId: string) => {
    if (selectedPet) {
      push(`/application?petId=${petId}`);
      closeModal();
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <div className="container mx-auto p-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">
            Meet the animals
          </h1>
          <h3 className="font-bold text-orange-400  text-center">
            Үнэнч анд хайж байна уу? Манай амьтад таны гэрт аз жаргал авчрахад
            бэлэн байна.
          </h3>
          <h3 className="font-bold text-orange-400 mb-8 text-center">
            Үрчлүүлэхийг хүлээж буй өхөөрдөм тэжээвэр амьтадтай танилцаарай!{" "}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => filterHandler(category.categoryNames)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  animalFilter === category.categoryNames
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-white text-orange-500 hover:bg-orange-100"
                }`}
              >
                {category.imageUrl} {category.categoryNames}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>NEWCARDS&Modal</div>
    </div>
  );
};

export default Petcard;
