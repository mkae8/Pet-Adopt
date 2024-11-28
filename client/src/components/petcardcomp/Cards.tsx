"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cake, Heart, MapPin, PawPrint, Ruler, Weight, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

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
  _id: string;
  categoryName: string;
  categoryLabel: string;
};

export const Cards = ({ pet }: { pet: Pet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const data = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const closeModal = () => setIsModalOpen(false);

  const submit = () => {
    if (!data.isSignedIn) {
      toast({
        title: "Эхлээд нэвтэрч орно уу",
        description: "Бүртгэлгүй бол бүртгүүлнэ үү",
        action: (
          <ToastAction
            onClick={() => {
              router.push("/sign-in");
            }}
            altText="Goto schedule to undo"
          >
            Нэвтрэх
          </ToastAction>
        ),
      });
    } else {
      router.push(`/application?petId=${pet._id}`);
    }
  };
  const width = window.innerWidth;
  useEffect(() => {
    if (width < 799) {
      setIsHovered(true);
    }
  });
  return (
    <>
      <motion.div
        className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={pet.image[0]}
          alt={pet.petName}
          className="w-full h-96 object-cover"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
          initial={{ height: "auto" }}
          animate={{ height: isHovered ? "auto" : "15%" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-x-2 group cursor-pointer">
            <h2 className="text-2xl font-bold text-center text-orange-500 transition-colors group-hover:text-orange-600">
              {pet.petName}
            </h2>
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              <Heart
                className="w-6 h-6 transition-colors"
                style={{
                  fill: isHovered ? "#f97316" : "none",
                  stroke: isHovered ? "#f97316" : "#f97316",
                }}
              />
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col space-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-orange-300 flex gap-2">
                Нас:
                <p className="text-white">{pet.age}</p>
              </span>
              <span className="font-semibold text-orange-300 flex gap-2">
                Хүйс:
                <p className="text-white">{pet.sex}</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-orange-300 flex gap-2">
                Статус:
                <p className="text-white">{pet.status}</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold flex text-orange-300 gap-2">
                Вакцинд хамрагдсан эсэх:
                <p className="text-white">{pet.isVaccined}</p>
              </span>
            </div>
            <div className="flex items-center text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-4 text-white font-semibold rounded-full bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Дэлгэрэнгүй
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl p-4 sm:p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative h-64 sm:h-full">
                <img
                  src={pet.image[0]}
                  alt={pet.petName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
                    {pet.petName}
                  </h2>
                  <p className="text-orange-300 font-bold text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    Онцог шинж чанарууд:
                    <span className="text-gray-700 font-normal">
                      {pet.description}
                    </span>
                  </p>
                  <ul className="text-gray-700 space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium">
                    <li className="flex items-center">
                      <Cake className="text-pink-400 w-5 h-5 mr-2" /> Нас:
                      {pet.age}
                    </li>
                    <li className="flex items-center">
                      <PawPrint className="text-orange-400 w-5 h-5 mr-2" />
                      Хүйс: {pet.sex}
                    </li>
                    <li className="flex items-center">
                      <Weight className="text-blue-400 w-5 h-5 mr-2" /> Жин:
                      {pet.weight}
                    </li>
                    <li className="flex items-center">
                      <Ruler className="text-green-400 w-5 h-5 mr-2" /> Хэмжээ:
                      {pet.size}
                    </li>
                    <li className="flex items-center">
                      <MapPin className="text-red-400 w-5 h-5 mr-2" /> Байршил:
                      {pet.location}
                    </li>
                    <li className="flex items-center">
                      <PawPrint className="text-purple-400 w-5 h-5 mr-2" />
                      Вакцинд хамрагдсан: {pet.isVaccined}
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={submit}
                  className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-gradient-to-r  bg-orange-500 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    {pet.petName} Үрчлэх
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
