"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cake, Heart, MapPin, PawPrint, Ruler, Weight } from "lucide-react";

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

export default function Cards({ pet }: { pet: Pet }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Escape товч дарахад модал хаах
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

  // Модал хаах функц
  const closeModal = () => setIsModalOpen(false);

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
            <h2 className="text-2xl font-bold text-center text-orange-400 transition-colors group-hover:text-orange-500">
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
            className="flex flex-col space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center ">
              <span className="font-semibold">Нас: {pet.age}</span>
              <span className="font-semibold">Хүйс: {pet.sex}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Статус: {pet.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                Вакцинд хамрагдсан эсэх: {pet.isVaccined}
              </span>
            </div>
            <div className="flex items-center text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-4 text-white font-semibold rounded-full bg-orange-400 hover:bg-orange-500 shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Дэлгэрэнгүй
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Зураг хэсэг */}
            <div className="relative">
              <img
                src={pet.image[0]}
                alt={pet.petName}
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />
              <div className="absolute top-4 right-4">
                <button className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-full shadow-lg">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Амьтны мэдээлэл */}
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">
              {pet.petName}
            </h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed pr-1">
              {" "}
              Онцог шинж чанарууд : <span>{pet.description}</span>
            </p>
            <ul className="text-gray-700 space-y-2 text-sm font-medium">
              <li className="flex items-center">
                <Cake className="text-pink-400 w-5 h-5 mr-2" /> Нас: {pet.age}
              </li>
              <li className="flex items-center">
                <PawPrint className="text-orange-400 w-5 h-5 mr-2" /> Хүйс:{" "}
                {pet.sex}
              </li>
              <li className="flex items-center">
                <Weight className="text-blue-400 w-5 h-5 mr-2" /> Жин:{" "}
                {pet.weight}
              </li>
              <li className="flex items-center">
                <Ruler className="text-green-400 w-5 h-5 mr-2" /> Хэмжээ:{" "}
                {pet.size}
              </li>
              <li className="flex items-center">
                <MapPin className="text-red-400 w-5 h-5 mr-2" /> Байршил:{" "}
                {pet.location}
              </li>
              <li className="flex items-center">
                <PawPrint className="text-purple-400 w-5 h-5 mr-2" /> Вакцинд
                хамрагдсан: {pet.isVaccined}
              </li>
            </ul>

            {/* Үйлдлийн товч */}
            <button className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Adopt {pet.petName}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
