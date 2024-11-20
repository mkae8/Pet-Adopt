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
              <motion.button
                key={index}
                onClick={() => filterHandler(category.categoryNames)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  animalFilter === category.categoryNames
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-white text-orange-500 hover:bg-orange-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.imageUrl} {category.categoryNames}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="grid justify-center grid-cols-3 gap-x-5 gap-y-28 mt-5 p-10">
          {pets
            .filter((pet) =>
              animalFilter
                ? pet.petCategoryId.categoryNames === animalFilter
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
                    <span className="text-[26px] tracking-normal leading-none font-bold text-orange-400 hover:text-[#0a303a] capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono">
                      {pet.petName}
                    </span>
                  </div>
                  <div className="flex flex-col p-3 gap-y-2">
                    <div className="flex justify-between">
                      {/* Age */}
                      <div className="text-[16px] font-bold text-[#0a303a] flex items-center">
                        Age :
                        <span className="text-[16px] font-bold text-orange-400 flex items-center pl-1">
                          {pet.age}
                        </span>
                      </div>
                      {/* Sex */}
                      <div className="text-[16px] font-bold text-[#0a303a] flex items-center">
                        Sex :
                        <span className="text-[16px] font-bold text-orange-400 flex items-center pl-1">
                          {pet.sex}
                        </span>
                      </div>
                    </div>

                    {/* Vaccination Status */}
                    <div className="text-[16px] font-bold text-[#0a303a] flex items-center">
                      Вакцинд орсон эсэх :
                      <span className="text-[16px] font-bold text-orange-400 flex items-center pl-1">
                        {pet.isVaccined}
                      </span>
                    </div>

                    {/* Adoption Status */}
                    <div className="text-[16px] font-bold text-[#0a303a] flex items-center">
                      Status :
                      <span className="text-[16px] font-bold text-orange-400 flex items-center pl-1">
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
                    className="w-[170px] h-[50px] bg-orange-500 hover:bg-[#0a303a]  text-white text-[20px] px-6 py-2 rounded-full font-semibold transform translate-y-full group-hover:translate-y-0 transition-all duration-150 flex items-center justify-center"
                  >
                    <Heart className="mr-2 z-10 transition-transform duration-300 hover:text-red-600 group-hover:scale-110 group-hover:animate-pulse" />{" "}
                    Adoption
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </div>

        <div className="group mt-5 flex justify-center items-center pt-10">
          <button
            onClick={() => setSliceCount((prev) => prev + 8)}
            className="relative h-12 w-48 md:h-12 md:w-48 rounded-full text-lg md:text-xl border border-orange-500 bg-primary flex justify-center items-center overflow-hidden transition duration-300 "
          >
            <span className="font-medium">See more</span>
          </button>
        </div>

        <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
          {selectedPet && (
            <DialogContent className="sm:max-w-[50%] md:max-w-[50%] lg:max-w-[40%] h-[50%]  md:rounded-[32px] overflow-hidden bg-white shadow-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row"
              >
                {/* Pet Image Section */}
                <div className="sm:max-w-[48%] md:max-w-[48%] lg:max-w-[48%] h-[58%]  md:rounded-[30px] relative ">
                  <img
                    src={selectedPet.image[0]}
                    alt={selectedPet.petName}
                    className=" object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Pet Details Section */}
                <div className="p-2 flex flex-col md:ml-6 gap-5 items-center md:items-start">
                  <DialogTitle className="text-[40px] tracking-normal leading-none font-bold text-orange-400 ">
                    {selectedPet.petName}
                  </DialogTitle>
                  <DialogHeader>
                    <div className="flex flex-col ">
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Нас :
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.age}
                        </span>
                      </div>
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Хүйс:
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.sex}
                        </span>
                      </div>
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Хэмжээ :
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.size}
                        </span>
                      </div>
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Статус :
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.status}
                        </span>
                      </div>
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Вакцинд хамрагдсан эсэх :
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.isVaccined}
                        </span>
                      </div>
                      <div className="text-gray-500 flex items-center font-serif gap-3">
                        Байршил :
                        <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                          {selectedPet.location}
                        </span>
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogDescription className="text-gray-500 flex items-center font-serif gap-3">
                    description :
                    <span className="text-primary  text-lg font-black font-mono text-orange-400 text-[16px]">
                      {selectedPet.description}
                    </span>
                  </DialogDescription>

                  {/* Adopt Button */}
                  <DialogFooter className="mt-4 w-full flex justify-center">
                    <div className="group">
                      <div className="relative h-14 w-52 md:h-16 md:w-56 rounded-sm text-xl font-semibold text-white border-0 bg-[#f04336] flex justify-center items-center  transition-all duration-300 ease-in-out overflow-hidden">
                        <Button
                          onClick={() => {
                            if (!data.isSignedIn) {
                              toast({
                                title: "Нэвтэрч орно уу",
                                description: "Бүртгэлгүй бол бүртгүүлнэ үү",
                                action: (
                                  <ToastAction
                                    onClick={() => {
                                      push("/sign-in");
                                    }}
                                    altText="Goto schedule to undo"
                                  >
                                    нэвтрэх
                                  </ToastAction>
                                ),
                              });
                              return;
                            } else {
                              handleAdoptClick(selectedPet._id);
                            }
                          }}
                          className="w-full h-full bg-[#F97316] text-white rounded-sm font-semibold text-lg flex justify-center items-center"
                        >
                          Adopt {selectedPet.petName}
                        </Button>
                        {/* Hover effect */}
                        <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                      </div>
                    </div>
                  </DialogFooter>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Petcard;
