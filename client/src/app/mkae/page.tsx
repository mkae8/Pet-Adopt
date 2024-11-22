"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Heart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cards from "@/components/petcardcomp/Cards";

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
  categoryLabel: string;
  imageUrl: string;
};

const Petcard = () => {
  const searchParams = useSearchParams();
  const filterName = searchParams.get("filter");
  const { toast } = useToast();
  const [pets, setPets] = useState<Pet[]>([]);
  const [animalFilter, setAnimalFilter] = useState<string>("All");
  const [sliceCount, setSliceCount] = useState<number>(6);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const filterHandler = (categoryName: string) => {
    setAnimalFilter(categoryName);
    setSliceCount(6);
  };

  const fetchPets = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }
      console.log("Fetching pets from:", backendUrl);
      const response = await axios.get<Pet[]>(`${backendUrl}/get/pet`);
      console.log("Fetched pets:", response.data);
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast({
        title: "Error",
        description: "Failed to fetch pets. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.BACKEND_URL);
  }, []);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  const filteredPets =
    animalFilter === "All"
      ? pets
      : pets.filter((pet) => pet.petCategoryId.categoryNames === animalFilter);

  return (
    <div className="bg-orange-50 min-h-screen p-4 sm:p-8">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4 text-center">
          Meet the animals
        </h1>
        <h3 className="font-bold text-orange-400 text-center text-sm sm:text-base">
          Үнэнч анд хайж байна уу? Манай амьтад таны гэрт аз жаргал авчрахад
          бэлэн байна.
        </h3>
        <h3 className="font-bold text-orange-400 mb-8 text-center text-sm sm:text-base">
          Үрчлүүлэхийг хүлээж буй өхөөрдөм тэжээвэр амьтадтай танилцаарай!
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : (
          <>
            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPets.slice(0, sliceCount).map((pet) => (
                  <motion.div
                    key={pet._id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                    onClick={() => openModal(pet)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={pet.image[0]}
                      alt={pet.petName}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-bold text-orange-600">
                      {pet.petName}
                    </h2>
                    <p className="text-sm text-gray-500">{pet.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No pets found for the selected filter.</p>
              </div>
            )}

            {filteredPets.length > sliceCount && (
              <div className="mt-8 flex justify-center">
                <motion.button
                  onClick={() => setSliceCount((prev) => prev + 6)}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Илүү үзэх
                </motion.button>
              </div>
            )}
          </>
        )}

        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedPet?.petName}</DialogTitle>
            </DialogHeader>
            {selectedPet && <Cards pet={selectedPet} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Petcard;
