"use client";


import { useEffect, useState } from "react";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
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

type PetCategory = { categoryNames: string;
  categoryLabel: string;
  imageUrl: string;
 
};

const types = [
  {
    categoryNames: "бүгд",
    imageUrl:
      "https://i.pinimg.com/474x/61/9a/57/619a57ac8d9f78f626ed52860de2310d.jpg",
  },
  {
    categoryNames: "нохой",
    imageUrl:
      "https://i.pinimg.com/736x/28/a0/16/28a016bd033d9f83cce0aa8bfb832fc7.jpg",
  },
  {
    categoryNames: "муур",
    imageUrl:
      "https://i.pinimg.com/736x/97/a7/3f/97a73f0f553157648c90655078101718.jpg",
  },
  {
    categoryNames: "шувуу",
    imageUrl:
      "https://i.pinimg.com/736x/9c/42/56/9c42563cd4d86a1aa0600b41070a51cd.jpg",
  },
  {
    categoryNames: "туулай",
    imageUrl:
      "https://i.pinimg.com/736x/a3/4a/d7/a34ad7f677b5cc7a0490fa9d9591832c.jpg",
  },
  {
    categoryNames: "мэрэгч",
    imageUrl:
      "https://i.pinimg.com/736x/a1/72/8c/a1728c9efa993c656c734a77e6741718.jpg",
  },
  {
    categoryNames: "загас",
    imageUrl:
      "https://i.pinimg.com/736x/a1/72/8c/a1728c9efa993c656c734a77e6741718.jpg",
  },
];

const Petcard = () => {


  const searchParams = useSearchParams();
  const filterName = searchParams.get("filter");

  const { toast } = useToast();
  const data = useUser();

  const { push } = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);

  const [animalFilter, setAnimalFilter] = useState<string>("бүгд");

  const [animalFilter, setAnimalFilter] = useState(filterName);


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

    <div className="flex items-center justify-center">
      <div className="bg-orange-50 min-h-screen p-8">
        <div className="container mx-auto p-12">
          <div className="container mx-auto">
            <h1 className="text-[30px] font-bold text-orange-600 mb-5 text-center">
              Meet the animals
            </h1>
            <h3 className="font-bold text-orange-600 text-center">
              Үнэнч анд хайж байна уу? Манай амьтад таны гэрт аз жаргал авчрахад
              бэлэн байна.
            </h3>
            <h3 className="font-bold text-orange-600 mb-8 text-center">
              Үрчлүүлэхийг хүлээж буй өхөөрдөм тэжээвэр амьтадтай танилцаарай!{" "}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {types.map((type, index) => (
                <motion.button
                  key={index}
                  onClick={() => filterHandler(type.categoryNames)}
                  className={`min-w-[110px] h-[45px] rounded-full border border-orange-600 p-3 bg-white hover:bg-orange-100 text-orange-600 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    animalFilter === type.categoryNames
                      ? "ring-2 ring-orange-500"
                      : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    className="h-[32px] w-[32px] rounded-full object-cover"
                    src={type.imageUrl}
                    alt={type.categoryNames}
                  />
                  <span className="font-medium">{type.categoryNames}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="grid justify-center grid-cols-3 gap-x-5 gap-y-28 mt-5 p-10">
            {pets
              ?.filter((pet) =>
                animalFilter
                  ? pet.petCategoryId.categoryLabel
                      .toLocaleLowerCase()
                      .includes(animalFilter)
                  : true
              )
              .slice(0, sliceCount)
              .map((pet, index) => (
                <motion.div
                  key={index}
                  style={{
                    perspective: "1000px",
                    cursor: "pointer",
                  }}
                  className="relative group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    src={pet.image[0]}
                    alt={pet.petName}
                    className="object-cover rounded-lg border group-hover:opacity-70 relative h-[450px] w-[380px]"
                    style={{
                      transition: "transform 0.5s ease-in-out",
                    }}
                  />

                  <motion.div
                    className="absolute top-[355px] w-[340px] h-[158px] left-5 p-4 bg-[#fff] rounded-sm z-10"
                    style={{
                      transition: "transform 1s ease-in-out",
                    }}
                  >
                    <div className="text-gray-500 flex items-center justify-center border-b border-gray-300 pb-2">
                      <span className="text-[26px] tracking-normal leading-none font-bold text-orange-600 capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono">
                        {pet.petName}
                      </span>
                    </div>
                    <div className="flex flex-col p-3">
                      <div className="flex justify-between">
                        <div className="text-[16px] tracking-normal leading-none font-bold text-orange-600 capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono flex items-center  gap-3">
                          Age :
                          <span className="text-primary  text-lg font-black font-mono text-orange-600 text-[16px]">
                            {pet.age}
                          </span>
                        </div>
                        <div className="text-[16px] tracking-normal leading-none font-bold text-orange-600 capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono flex items-center  gap-3">
                          Sex :
                          <span className="text-primary  text-lg font-black font-mono text-orange-600 text-[16px]">
                            {pet.sex}
                          </span>
                        </div>
                      </div>
                      <div className="text-[16px] tracking-normal leading-none font-bold text-orange-600 capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono flex items-center  gap-3">
                        Status :
                        <span className="text-primary  text-lg font-black font-mono text-orange-600 text-[16px]">
                          {pet.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Button that will appear on hover */}
                  <motion.div
                    key={index}
                    className="absolute top-36 left-[200px] transform -translate-x-1/2  mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(pet);
                      }}
                      className="w-[160px] h-[50px] bg-orange-500 hover:bg-orange-600 text-white text-[20px] px-6 py-2 rounded-full font-semibold transform translate-y-full group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center"
                    >
                      <Heart className="w-5 h-5 mr-2" /> Adoption
                    </button>
                  </motion.div>
                </motion.div>
              ))}
          </div>

          <div className="group mt-5 flex justify-center items-center pt-10">
            <button
              onClick={() => setSliceCount((prev) => prev + 8)}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
            >
              Load More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Petcard;
