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
};

type PetCategory = {
  categoryNames: string;
  // categoryName: string;
  imageUrl: string;
};

const types: PetCategory[] = [
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
    <div className="min-h-full flex items-center justify-center">
      <div className="mx-auto p-4">
        <div
          className="min-h-screen w-screen flex pt-52 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/4c/ca/35/4cca35ed0cbe01e1d861f971ab27fd8c.jpg')",
            zIndex: -1,
          }}
        >
          <div className="container mx-auto p-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl text-black font-bold mb-4 md:mb-0 p-4 hover:text-slate-800">
                Meet our friends
              </h1>
              <div className="flex gap-4 overflow-x-auto md:overflow-visible flex-wrap md:flex-wrap">
                {types.map((type, index) => (
                  <button
                    onClick={() => filterHandler(type.categoryNames)}
                    key={index}
                    className="min-w-[80px] md:min-w-[110px] h-[45px] rounded-full border border-primary-600 p-3 bg-primary hover:bg-slate-100 hover:text-black flex items-center justify-center gap-2 cursor-pointer transition ease-in-out duration-300 mb-4 md:mb-0"
                  >
                    <img
                      className="h-[32px] w-[32px] rounded-full"
                      src={type.imageUrl}
                      alt={type.categoryNames}
                    />
                    <div className="text-white hover:text-black font-medium hover:nav_link nhome_link btn_text">
                      {type.categoryNames}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
              {pets // CARD heseg
                .filter((pet) =>
                  animalFilter
                    ? pet.petCategoryId.categoryNames === animalFilter
                    : true
                )
                .slice(0, sliceCount)
                .map((pet, index) => (
                  <motion.div
                    className="cursor-pointer h-[380px] rounded-lg border border-solid bg-white shadow-2xl flex flex-col relative  transform hover:scale-105 hover:rotate-y-6 transition-all duration-500 ease-in-out"
                    onClick={() => openModal(pet)}
                    style={{
                      perspective: "1000px",
                      cursor: "pointer",
                    }}
                  >
                    <motion.img
                      src={pet.image[0]}
                      alt={pet.petName}
                      className=" h-[200px] md:h-[250px] object-cover rounded-lg "
                      style={{
                        transform: "rotateY(0deg)",
                        padding: "15px",
                        transition: "transform 0.5s ease-in-out",
                      }}
                    />
                    <div className="pl-3 flex flex-col ">
                      <div className=" text-gray-500 h-10 flex items-center">
                        Амьтаны нэр:
                        <span className="text-black p-3 text-lg font-bold">
                          {pet.petName}
                        </span>
                      </div>
                      {/* <div className=" text-gray-500 h-10 flex  items-center">
                        Амьтаны төрөл
                        <span className="text-black p-3  text-2xl font-bold">
                          {pet.petCategoryId.categoryName}
                        </span>
                      </div> */}
                      <div className=" text-gray-500 h-10 flex items-center">
                        Амьтаны нас:
                        <span className="text-black p-3  text-lg font-bold">
                          {pet.age}{" "}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            <div className="group mt-5">
              <button
                onClick={() => setSliceCount((prev) => prev + 8)}
                className="relative h-12 w-40 md:h-16 md:w-48 rounded-full text-lg md:text-xl border border-orange-500 bg-primary flex justify-center items-center overflow-hidden transition duration-300"
              >
                <span className="font-medium text-xl">See more</span>
              </button>
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
                      alt={selectedPet.petName}
                      className="w-full md:w-[50%] h-[250px] md:h-auto rounded-lg shadow-md object-cover"
                    />
                    <div className="p-4 flex flex-col mt-4 md:mt-0 md:ml-4 justify-between items-center md:items-start">
                      <div className="text-center md:text-left mt-6">
                        <DialogTitle className="text-2xl md:text-3xl font-bold">
                          {selectedPet.petName}
                        </DialogTitle>
                        <DialogHeader>
                          <p className="text-lg md:text-xl mt-2">
                            {selectedPet.description}
                          </p>
                          <DialogDescription className="text-md md:text-lg mt-1">
                            {selectedPet.petName} • {selectedPet.age}
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                      <DialogFooter className="mt-4 md:mt-8 w-full">
                        <div className="group">
                          <div
                            className="relative h-12 w-40 md:h-16 md:w-48 rounded-sm mt-3 text-lg md:text-xl
                 border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
                          >
                            <span className="relative  z-10 btn_text sm:flex self-center ">
                              <Button
                                onClick={() => {
                                  if (!data.isSignedIn) {
                                    console.log(data.isSignedIn);

                                    toast({
                                      title: "Нэвтэрч орно уу",
                                      description:
                                        "Бүртгэлгүй бол бүртгүүлнэ үү",
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
                              >
                                adopt {selectedPet.petName}
                              </Button>
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
