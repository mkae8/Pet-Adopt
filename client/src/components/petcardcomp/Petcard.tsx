"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Cards } from "./Cards";
import { Button } from "@/components/ui/button";
import { Loading } from "../Loading";
import { useQueryState } from "nuqs";
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
type PetCategory = { _id: string; categoryName: string; categoryLabel: string };
const Petcard = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<PetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/get/categories`);
      setCategories([
        { _id: "all", categoryName: "бүгд", categoryLabel: "Бүгд" },
        ...res.data,
      ]);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Pet[]>(
        `${process.env.BACKEND_URL}/get/pet`
      );
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
    fetchPets();
  }, []);

  const [filter, setFilter] = useQueryState("filter");

  useEffect(() => {}, [filter]);

  const filteredPets =
    filter === "бүгд"
      ? pets
      : pets.filter((pet) => pet.petCategoryId.categoryName === filter);
  return (
    <div>
      <div className="bg-orange-50 min-h-screen p-4 sm:p-8">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4 text-center">
            Үрчлүүлэх амьтадтай танилцаарай
          </h1>
          <h3 className="font-semibold text-orange-300 mb-8 text-center text-sm sm:text-base">
            Үнэнч анд хайж байна уу? Манай амьтад таны гэрт аз жаргал авчрахад
            бэлэн байна.
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={
                    filter === category.categoryName ? "default" : "outline"
                  }
                  onClick={() => setFilter(category.categoryName)}
                  className="min-w-[100px] sm:min-w-[120px]"
                >
                  {category.categoryLabel}
                </Button>
              </motion.div>
            ))}
          </div>
          {loading ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                <Loading />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) =>
                  pet.status === "Үрчлэгдсэн" ? (
                    ""
                  ) : (
                    <Cards key={pet._id} pet={pet} />
                  )
                )
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  Энэ ангилалд тэжээвэр амьтан олдсонгүй.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mb-20">
        <img
          src="./bottomshape.png"
          alt="Bottom Shape"
          className="w-full bg-orange-50"
        />
      </div>
    </div>
  );
};
export default Petcard;
