"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Loading } from "../Loading";
import { Cards } from "./Cards";

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
type Category = {
  _id: string;
  categoryName: string;
  categoryLabel: string;
};

// const categories: PetCategory[] = [
//   { categoryNames: "бүгд", imageUrl: "🐾" },
//   { categoryNames: "нохой", imageUrl: "🐶" },
//   { categoryNames: "муур", imageUrl: "🐱" },
//   { categoryNames: "шувуу", imageUrl: "🦜" },
//   { categoryNames: "туулай", imageUrl: "🐰" },
//   { categoryNames: "мэрэгч", imageUrl: "🐹" },
//   { categoryNames: "загас", imageUrl: "🐠" },
// ];

const Petcard = () => {
  const { push } = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
          {categories.map((category) => (
            <div key={category._id}>{category.categoryLabel}</div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => <Cards key={pet._id} pet={pet} />)
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                <Loading />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Petcard;
