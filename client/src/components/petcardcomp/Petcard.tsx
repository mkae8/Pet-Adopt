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
    <div className=" flex items-center justify-center">
      <div className="">
        <div
          className="min-h-screen w-screen flex bg-cover bg-center bg-slate-100"
          // style={{
          //   backgroundImage:
          //     "url('https://i.pinimg.com/736x/4c/ca/35/4cca35ed0cbe01e1d861f971ab27fd8c.jpg')",
          //   zIndex: -1,
          // }}
        >
          <div className="container mx-auto p-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl text-black font-bold mb-4 md:mb-0 p-4 hover:text-slate-800">
                Бидний найзуудтай танилц
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

            <div className="grid justify-center grid-cols-3 gap-x-5 gap-y-28 mt-5 p-20">
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
                      className="absolute top-[375px] w-[340px] h-[158px] left-5 p-4 bg-[#fff] rounded-lg z-10"
                      style={{
                        transition: "transform 0.5s ease-in-out",
                      }}
                    >
                      <div className="text-gray-500 flex items-center justify-center border-b border-gray-300 pb-5">
                        <span className="text-[30px] tracking-normal leading-none font-bold text-[#f04336] capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono">
                          {pet.petName}
                        </span>
                      </div>
                      <div className="flex flex-col p-3">
                        <div className="text-gray-500 flex items-center font-serif gap-3">
                          Амьтаны нас :
                          <span className="text-primary  text-lg font-black font-mono text-[#f04336] tex-[20px]">
                            {pet.age}
                          </span>
                        </div>
                        <div className="text-gray-500 flex items-center font-serif gap-3">
                          Амьтаны тухай :
                          <span className="text-primary text-lg font-black font-mono text-[#f04336] tex-[20px]">
                            {pet.description}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Button that will appear on hover */}
                    <motion.div
                      key={index}
                      className="absolute top-36 left-[200px] transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening modal when clicking the button
                          openModal(pet); // Open the modal when the button is clicked
                        }}
                        className="w-[168px] h-[55px] select-none bg-[#f04336] border-0 rounded-sm text-white cursor-pointer flex justify-center items-center text-[20px] font-extrabold tracking-normal leading-none mb-0 py-[17px] px-[25px] text-center capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-[Nunito] relative z-10 overflow-hidden"
                      >
                        Adopt pet
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
                    <div className="sm:max-w-[48%] md:max-w-[48%] lg:max-w-[38%] h-[48%]  md:rounded-[30px] relative ">
                      <img
                        src={selectedPet.image[0]}
                        alt={selectedPet.petName}
                        className=" object-cover rounded-lg shadow-lg"
                      />
                    </div>

                    {/* Pet Details Section */}
                    <div className="p-2 flex flex-col md:ml-6 gap-5 items-center md:items-start">
                      <DialogTitle className="text-[40px] tracking-normal leading-none font-bold text-[#f04336] capitalize touch-manipulation transition-all duration-300 ease-in-out align-middle whitespace-nowrap font-mono">
                        {selectedPet.petName}
                      </DialogTitle>
                      <DialogHeader>
                        <div className="flex flex-col ">
                          <div className="text-gray-500 flex items-center font-serif gap-3">
                            Амьтаны нас :
                            <span className="text-primary  text-lg font-black font-mono text-[#f04336] tex-[20px]">
                              {selectedPet.age}
                            </span>
                          </div>
                          <div className="text-gray-500 flex items-center font-serif gap-3">
                            Амьтаны тухай :
                            <span className="text-primary text-lg font-black font-mono text-[#f04336] tex-[20px]">
                              {selectedPet.description}
                            </span>
                          </div>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="text-gray-500 flex items-center font-serif gap-3">
                        description :
                        <span className="text-primary text-lg font-black font-mono text-[#f04336] tex-[20px]">
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
      </div>
    </div>
  );
};

export default Petcard;
