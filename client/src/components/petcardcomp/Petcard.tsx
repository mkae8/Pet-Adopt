"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cards from "./Cards";

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
  petCategoryId: PetCategory;
  location: string;
  isVaccined: string;
};

type PetCategory = {
  categoryNames: string;
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
  const { push } = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [animalFilter, setAnimalFilter] = useState<string>("бүгд");

  const filterHandler = (categoryNames: string) => {
    setAnimalFilter(categoryNames);
  };

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

  const filteredPets =
    animalFilter === "бүгд"
      ? pets
      : pets.filter((pet) => pet.petCategoryId.categoryNames === animalFilter);

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <div className="container mx-auto p-12">
        <h1 className="text-4xl font-bold text-orange-400 mb-4 text-center">
          Meet the animals
        </h1>
        <h3 className="font-bold text-orange-400 text-center">
          Үнэнч анд хайж байна уу? Манай амьтад таны гэрт аз жаргал авчрахад
          бэлэн байна.
        </h3>
        <h3 className="font-bold text-orange-400 mb-8 text-center">
          Үрчлүүлэхийг хүлээж буй өхөөрдөм тэжээвэр амьтадтай танилцаарай!
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => filterHandler(category.categoryNames)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer ${
                animalFilter === category.categoryNames
                  ? "bg-orange-400 text-white shadow-lg scale-105"
                  : "bg-white text-orange-500 hover:bg-orange-100"
              }`}
            >
              {category.imageUrl} {category.categoryNames}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => <Cards key={pet._id} pet={pet} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Систем ачааллаж байна түр хүлээнэ үү...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Petcard;
