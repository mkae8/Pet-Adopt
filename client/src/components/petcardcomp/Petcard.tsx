"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
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
import { Dog, Cat, Bird, Fish, Rabbit, Search, Fullscreen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import axios from "axios";

type Pet = {
  _id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  image: string[];
};

type PetCategory = {
  names: string;
  imageUrl: string;
};

const types: PetCategory[] = [
  {
    names: "бүгд",
    imageUrl: "tomjerry.png",
  },
  {
    names: "нохой",
    imageUrl: "dog.jpeg",
  },
  {
    names: "муур",
    imageUrl: "cat.jpeg",
  },
  {
    names: "шувуу",
    imageUrl: "bird.png",
  },
  {
    names: "туулай",
    imageUrl: "rabbit.jpeg",
  },
  {
    names: "мэрэгч",
    imageUrl: "chipmunks.jpeg",
  },
  {
    names: "загас",
    imageUrl: "fish.jpeg",
  },
];

const Petcard = () => {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [sliceCount, setSliceCount] = useState(8);
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchPet = async () => {
    try {
      const response = await axios.get<Pet[]>(
        `${process.env.BACKEND_URL}/get/pet`
      );
      setPets(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
  };
  const closeModal = () => {
    setSelectedPet(null);
  };

  const handleAdoptClick = (petId: string) => {
    if (selectedPet) {
      router.push(`/application?petId=${petId}`);
      closeModal();
    }
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const ROTATION_RANGE = 5;
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    const rX = (mouseY - 0.5) * ROTATION_RANGE - index;
    const rY = (mouseX - 0.5) * ROTATION_RANGE + index;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get/pet");
      console.log(response);

      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center
    "
    >
      <div
        className=" mx-auto p-4
       "
      >
        <div
          className="min-h-screen w-screen flex items-center justify-center"
          style={{
            backgroundImage: "url('/wallpaper3.jpeg')",
            zIndex: -1,
          }}
        >
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mt-3">
              <h1 className="text-2xl text-black font-bold mb-4 md:mb-0">
                Бидний найзуудтай танилц
              </h1>
              <div className="flex gap-4 overflow-x-auto md:overflow-visible flex-wrap md:flex-wrap">
                {types.map((type, index) => (
                  <div
                    key={index}
                    className="min-w-[80px] md:min-w-[110px] h-[45px] rounded-full flex items-center justify-center gap-2 cursor-pointer transition ease-in-out duration-300 mb-4 md:mb-0"
                  >
                    <img
                      className="h-[32px] w-[32px] rounded-full"
                      src={type.imageUrl}
                      alt=""
                    />
                    <div className="text-black text-sm md:text-base  hover:nav_link nhome_link btn_text">
                      {type.names}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pets.slice(0, sliceCount).map((pet, index) => (
                  <motion.div
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                    ref={ref}
                    style={{ transform, transformStyle: "preserve-3d" }}
                    key={pet._id}
                    className="cursor-pointer h-[380px] bg-white rounded-lg flex flex-col justify-between relative"
                    onClick={() => openModal(pet)}
                  >
                    <div>
                      <motion.img
                        style={{
                          transform: "translateZ(75px)",
                        }}
                        src={pet.image[0]}
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
                  </motion.div>
                ))}
              </div>
              <div className="group">
                <div
                  className="relative h-12 w-40 md:h-16 md:w-48 rounded-full mt-3 text-lg md:text-xl 
                 border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
                  onClick={() => setSliceCount((prev) => prev + 8)}
                >
                  <span className="relative z-10 btn_text ">See more</span>
                  <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                </div>
              </div>
            </div>

            <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
              {selectedPet && (
                <DialogContent className="sm:max-w-[90%] md:max-w-[60%] h-[60%]  md:rounded-[32px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row"
                  >
                    <img
                      src={selectedPet.image[0]}
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
                        <div className="group">
                          <div
                            className="relative h-12 w-40 md:h-16 md:w-48 rounded-sm mt-3 text-lg md:text-xl 
                 border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
                            onClick={() => handleAdoptClick(selectedPet._id)}
                          >
                            <span className="relative  z-10 btn_text sm:flex self-center ">
                              adopt {selectedPet.name}
                            </span>
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
      </div>
    </div>
  );
};

export default Petcard;
