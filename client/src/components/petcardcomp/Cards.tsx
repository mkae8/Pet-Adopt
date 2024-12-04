"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cake,
  Heart,
  MapPin,
  PawPrint,
  Ruler,
  Weight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { boolean } from "zod";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsHovered(true);
    }
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === pet.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? pet.image.length - 1 : prevIndex - 1
    );
  };
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
          className="w-[384px] h-96 object-cover"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
          initial={{ height: "15%" }}
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
              <span className="font-semibold text-orange-500 flex gap-2">
                Нас:
                <p className="text-white">{pet.age}</p>
              </span>
              <span className="font-semibold text-orange-500 flex gap-2">
                Хүйс:
                <p className="text-white">{pet.sex}</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-orange-500 flex gap-2">
                Статус:
                <p className="text-white">{pet.status}</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold flex text-orange-500 gap-2">
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl p-4 sm:p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative h-64 sm:h-full">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <motion.img
                      key={currentImageIndex}
                      src={pet.image[currentImageIndex]}
                      alt={`${pet.petName} - Image ${currentImageIndex + 1}`}
                      className="w-full h-[500px] object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    {pet.image.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 transition-all duration-300 opacity-50 hover:opacity-100 hover:bg-opacity-70"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 transition-all duration-300 opacity-50 hover:opacity-100 hover:bg-opacity-70"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {pet.image.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
                      {pet.petName}
                    </h2>
                    <p className="text-orange-500 font-bold text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                      Онцог шинж чанарууд:
                      <span className="text-gray-700 font-normal  ml-2">
                        {pet.description}
                      </span>
                    </p>
                    <ul className="text-gray-700 space-y-3 sm:space-y-4 text-sm sm:text-base">
                      {[
                        { icon: Cake, label: "Нас", value: pet.age },
                        { icon: PawPrint, label: "Хүйс", value: pet.sex },
                        { icon: Weight, label: "Жин", value: pet.weight },
                        { icon: Ruler, label: "Хэмжээ", value: pet.size },
                        { icon: MapPin, label: "Байршил", value: pet.location },
                        {
                          icon: PawPrint,
                          label: "Вакцинд хамрагдсан",
                          value: pet.isVaccined,
                        },
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <item.icon
                            className={`w-5 h-5 mr-3 text-orange-500`}
                          />
                          <div className="font-medium flex items-center gap-2">
                            {item.label}:
                            <span className="font-normal text-gray-600">
                              {item.value}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={submit}
                    className="mt-6 w-full py-3 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-base sm:text-lg">
                      {pet.petName} Үрчлэх
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
