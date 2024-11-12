"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Dog, Cat, Bird, Fish, Rabbit, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

type Pet = {
  id: number;
  name: string;
  breed: string;
  age: string;
  description: string;
  imageUrl: string;
};

const pets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3 years",
    description: "Friendly and energetic, loves to play fetch!",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: "Siamese Cat",
    age: "2 years",
    description: "Calm and affectionate, enjoys lounging in the sun.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
  },
  {
    id: 3,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
  },
  {
    id: 5,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 6,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 7,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 8,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 9,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
];

type PetCategory = {
  names: string;
  imageUrl: string;
};

const types: PetCategory[] = [
  {
    names: "all",
    imageUrl: "all.png",
  },
  {
    names: "dogs",
    imageUrl: "all.png",
  },
  {
    names: "cats",
    imageUrl: "all.png",
  },
  {
    names: "rabbit",
    imageUrl: "all.png",
  },
  {
    names: "parrot",
    imageUrl: "all.png",
  },
];
export default function Petcard() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  const [sliceCount, setSliceCount] = useState(8);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mt-3">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Meet Our Friends</h1>
          <div className="flex gap-4 overflow-x-auto">
            {types.map((type, index) => (
              <div
                key={index}
                className="min-w-[80px] md:min-w-[100px] h-[45px] rounded-full flex items-center justify-center gap-2 cursor-pointer bg-white border hover:bg-[#F97316] transition ease-in-out duration-300 hover:text-white"
              >
                <img
                  className="h-[32px] w-[32px] rounded-full"
                  src={type.imageUrl}
                  alt=""
                />
                <div>{type.names}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pets.slice(0, sliceCount).map((pet, index) => (
              <div
                key={pet.id}
                className="cursor-pointer h-[380px] bg-white rounded-lg flex flex-col justify-between"
                onClick={() => openModal(pet)}
              >
                <motion.img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-[200px] md:h-[250px] object-cover rounded-[16px] shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20, scale: 1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -20, rotate: -5 }}
                  transition={{
                    duration: 0.5 + (index - 0.5),
                    ease: "easeInOut",
                  }}
                />

                <div className="mt-2 p-4">
                  <div className="text-xl md:text-2xl font-semibold">
                    {pet.name}
                  </div>
                  <div className="text-lg md:text-xl font-normal">
                    {pet.breed}
                  </div>
                  <div className="text-md md:text-lg">{pet.age}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="group">
            <a className="w-inline-block btn_main" target="_blank" href="">
              <div
                className="relative h-12 w-40 md:h-16 md:w-48 rounded-full mt-3 text-lg md:text-xl 
                 border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
                onClick={() => setSliceCount((prev) => prev + 8)}
              >
                <span className="relative z-10 btn_text ">See more</span>
                <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </div>
            </a>
          </div>
        </div>

        <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
          {selectedPet && (
            <DialogContent className="sm:max-w-[90%] md:max-w-[60%] h-[60%] p-0 md:rounded-[32px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} // Initial state
                animate={{ opacity: 1, scale: 1 }} // Animate to this state
                exit={{ opacity: 0, scale: 0.8 }} // Exit state
                transition={{ duration: 0.3 }} // Transition duration
                className="flex flex-col md:flex-row"
              >
                <img
                  src={selectedPet.imageUrl}
                  alt={selectedPet.name}
                  className="w-full md:w-[50%] h-[250px] md:h-auto rounded-lg shadow-md object-cover"
                />
                <div className="p-4 flex flex-col mt-4 md:mt-0 md:ml-4 justify-between items-center md:items-start">
                  <div className="text-center md:text-left mt-6">
                    <DialogTitle className="text-2xl md:text-3xl font-bold">
                      {selectedPet.name}
                    </DialogTitle>
                    <DialogHeader>
                      <p className="text-lg md:text-xl mt-2">
                        {selectedPet.description}
                      </p>
                      <DialogDescription className="text-md md:text-lg mt-1">
                        {selectedPet.breed} • {selectedPet.age}
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <DialogFooter className="mt-4 md:mt-8 w-full">
                    <Button
                      className="w-full md:w-auto px-8 py-3 text-lg md:text-xl"
                      onClick={closeModal}
                    >
                      Adopt {selectedPet.name}
                    </Button>
                  </DialogFooter>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
