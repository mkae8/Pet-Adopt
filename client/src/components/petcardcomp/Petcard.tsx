"use client";

import { useEffect, useState } from "react";
import React, { useRef } from "react";
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
import { Card } from "../ui/card";

type Pet = {
  _id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  image: string[];
  petCategoryId: PetCategory;
};

type PetCategory = {
  categoryNames: string;
  imageUrl: string;
};

const types: PetCategory[] = [
  {

    categoryNames: "бүгд",
    imageUrl: "tomjerry.png",
  },
  {
    categoryNames: "Dog",
    imageUrl: "dog.jpeg",
  },
  {
    categoryNames: "Cat",
    imageUrl: "cat.jpeg",
  },
  {
    categoryNames: "Bird",
    imageUrl: "bird.png",
  },
  {
    categoryNames: "Rabbit",
    imageUrl: "rabbit.jpeg",
  },
  {
    categoryNames: "Hamster",
    imageUrl: "chipmunks.jpeg",
  },
  {
    categoryNames: "Fish",
    imageUrl: "fish.jpeg",

    names: "бүгд",
    imageUrl:
      "https://i.pinimg.com/474x/61/9a/57/619a57ac8d9f78f626ed52860de2310d.jpg",
  },
  {
    names: "нохой",
    imageUrl:
      "https://i.pinimg.com/736x/28/a0/16/28a016bd033d9f83cce0aa8bfb832fc7.jpg",
  },
  {
    names: "муур",
    imageUrl:
      "https://i.pinimg.com/736x/97/a7/3f/97a73f0f553157648c90655078101718.jpg",
  },
  {
    names: "шувуу",
    imageUrl:
      "https://i.pinimg.com/736x/9c/42/56/9c42563cd4d86a1aa0600b41070a51cd.jpg",
  },
  {
    names: "туулай",
    imageUrl:
      "https://i.pinimg.com/736x/a3/4a/d7/a34ad7f677b5cc7a0490fa9d9591832c.jpg",
  },
  {
    names: "мэрэгч",
    imageUrl:
      "https://i.pinimg.com/736x/a1/72/8c/a1728c9efa993c656c734a77e6741718.jpg",
  },
  {
    names: "загас",
    imageUrl:

  },
];

const Petcard = () => {
  const { toast } = useToast();
  const data = useUser();
  const { push } = useRouter();
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [sliceCount, setSliceCount] = useState(8);
  const [pets, setPets] = useState<Pet[]>([]);

  const [animalFilter, setAnimalFilter] = useState("");

  const filterHandler = (categoryNames: string) => {
    setAnimalFilter(categoryNames);
  };

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
      const response = await axios.get(`${process.env.BACKEND_URL}/get/pet`);
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
      className=" min-h-full flex items-center justify-center
    "
    >
      <div
      //   className=" mx-auto p-4
      //  "
      >
        <div
          className="min-h-screen w-screen flex pt-52 bg-cover bg-center"
          style={{
            // backgroundImage:
            //   "url('https://i.pinimg.com/736x/4c/ca/35/4cca35ed0cbe01e1d861f971ab27fd8c.jpg')",
            zIndex: -1,
          }}
        >
          <div className="container mx-auto p-12">
            <div className="flex flex-col md:flex-row justify-between items-center ">
              <h1 className="text-2xl text-black font-bold mb-4 md:mb-0 p-4 hover:text-slate-800">
                Meet our friends
              </h1>
              <div className="flex gap-4 overflow-x-auto md:overflow-visible flex-wrap md:flex-wrap">
                {types.map((type, index) => (
                  <button
                    onClick={() => filterHandler(type.categoryNames)}
                    key={index}
                    className="min-w-[80px] md:min-w-[110px] h-[45px] rounded-full border border-primary-600 p-3 bg-primary hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer transition ease-in-out duration-300 mb-4 md:mb-0 "
                  >
                    <img
                      className="h-[32px] w-[32px] rounded-full"
                      src={type.imageUrl}
                      alt=""
                    />

                    <div className="text-black text-sm md:text-base  hover:nav_link nhome_link btn_text">
                      {type.categoryNames}

                    <div className="text-black text-xl font-medium md:text-base  hover:nav_link nhome_link btn_text">
                      {type.names}

                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 mt-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pets
                  .filter((pet) => pet.petCategoryId?.categoryNames)
                  .slice(0, sliceCount)
                  .map((pet, index) => (
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

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {pets.slice(0, sliceCount).map((pet, index) => (
                  <motion.div
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                    ref={ref}
                    style={{
                      transform,
                      transformStyle: "preserve-3d",
                      cursor: "pointer",
                    }}
                    key={pet._id}
                    className="cursor-pointer h-[380px] bg-white rounded-lg flex flex-col justify-between relative border-solid border-black"
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
                  </motion.div>
                ))}
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pets.slice(0, sliceCount).map((pet, index) => (
                  <motion.div
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                    ref={ref}
                    style={{
                      transform,
                      transformStyle: "preserve-3d",
                      cursor: "pointer",
                    }}
                    key={pet._id}
                    className="cursor-pointer h-[380px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group"
                    onClick={() => openModal(pet)}
                  >
                    <div className="relative">
                      <motion.img
                        style={{
                          transform: "translateZ(75px)",
                        }}
                        src={pet.image[0]}
                        alt={pet.name}
                        className="w-full h-[250px] md:h-[300px] object-cover rounded-t-xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                        initial={{ opacity: 0, y: 20, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                          duration: 0.5 + (index - 0.5),
                          ease: "easeInOut",
                        }}
                      />

                      {/* Хил болон нөлөө */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-t-xl opacity-60 group-hover:opacity-40"></div>
                    </div>

                    {/* Текстийн хэсэг */}
                    <div className="mt-4 p-4">
                      <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
                        {pet.name}
                      </div>
                      <div className="text-lg md:text-xl font-normal text-gray-600">
                        {pet.breed}
                      </div>
                      <div className="text-md md:text-lg text-gray-500">
                        {pet.age} нас
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
                                adopt {selectedPet.name}
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
    // <div className="min-h-screen flex items-center justify-center relative">
    //   {/* Background Image */}
    //   <div
    //     className="absolute inset-0 bg-cover bg-center"
    //     style={{
    //       backgroundImage: "url('/pet.jpg')",
    //       zIndex: -1,
    //       backgroundAttachment: "fixed",
    //       backgroundPosition: "center",
    //       backgroundSize: "cover",
    //     }}
    //   ></div>

    //   {/* Main Content */}
    //   <div className="container mx-auto p-4 relative z-10">
    //     {/* Header Section */}
    //     <div className="flex flex-col md:flex-row justify-between items-center mt-5">
    //       <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-4 md:mb-0">
    //         Бидний найзуудтай танилц
    //       </h1>
    //       <div className="flex gap-4 overflow-x-auto md:overflow-visible flex-wrap md:flex-wrap">
    //         {types.map((type, index) => (
    //           <div
    //             key={index}
    //             className="min-w-[80px] md:min-w-[120px] h-[45px] rounded-full flex items-center justify-center gap-2 cursor-pointer transition ease-in-out duration-300 mb-4 md:mb-0 bg-white bg-opacity-60 hover:bg-opacity-80 shadow-md"
    //           >
    //             <img
    //               className="h-[32px] w-[32px] rounded-full"
    //               src={type.imageUrl}
    //               alt=""
    //             />
    //             <div className="text-white text-sm md:text-base font-semibold hover:underline">
    //               {type.names}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Pet Cards Section */}
    //     <div className="flex flex-col items-center gap-8 mt-8">
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //         {pets.slice(0, sliceCount).map((pet, index) => (
    //           <motion.div
    //             onMouseMove={(e) => handleMouseMove(e, index)}
    //             onMouseLeave={handleMouseLeave}
    //             ref={ref}
    //             style={{ transform, transformStyle: "preserve-3d" }}
    //             key={pet._id}
    //             className="cursor-pointer h-[380px] bg-white rounded-lg flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    //             onClick={() => openModal(pet)}
    //           >
    //             <div>
    //               <motion.img
    //                 style={{
    //                   transform: "translateZ(75px)",
    //                 }}
    //                 src={pet.image[0]}
    //                 alt={pet.name}
    //                 className="w-full h-[200px] md:h-[250px] object-cover rounded-t-[16px] shadow-md hover:shadow-lg transition-shadow duration-300"
    //                 initial={{ opacity: 0, y: 20, scale: 1 }}
    //                 animate={{ opacity: 1, y: 0, rotate: 0 }}
    //                 exit={{ opacity: 0, y: -20, rotate: -5 }}
    //                 transition={{
    //                   duration: 0.5 + (index - 0.5),
    //                   ease: "easeInOut",
    //                 }}
    //               />
    //               <div className="mt-3 p-4">
    //                 <div className="text-xl md:text-2xl font-semibold text-gray-800">
    //                   {pet.name}
    //                 </div>
    //                 <div className="text-lg md:text-xl font-normal text-gray-600">
    //                   {pet.breed}
    //                 </div>
    //                 <div className="text-md md:text-lg text-gray-500">
    //                   {pet.age}
    //                 </div>
    //               </div>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>

    //       {/* See More Button */}
    //       <div className="group">
    //         <div
    //           className="relative h-12 w-40 md:h-16 md:w-48 rounded-full mt-6 text-lg md:text-xl
    //         border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
    //           onClick={() => setSliceCount((prev) => prev + 8)}
    //         >
    //           <span className="relative z-10 text-white">See more</span>
    //           <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Pet Detail Modal */}
    //     <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
    //       {selectedPet && (
    //         <DialogContent className="sm:max-w-[90%] md:max-w-[60%] h-[60%] md:rounded-[32px] bg-white shadow-lg">
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.8 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 0.8 }}
    //             transition={{ duration: 0.3 }}
    //             className="flex flex-col md:flex-row"
    //           >
    //             <img
    //               src={selectedPet.image[0]}
    //               alt={selectedPet.name}
    //               className="w-full md:w-[50%] h-[250px] md:h-auto rounded-lg shadow-md object-cover"
    //             />
    //             <div className="p-4 flex flex-col mt-4 md:mt-0 md:ml-4 justify-between items-center md:items-start">
    //               <div className="text-center md:text-left mt-6">
    //                 <DialogTitle className="text-2xl md:text-3xl font-bold text-black">
    //                   {selectedPet.name}
    //                 </DialogTitle>
    //                 <DialogHeader>
    //                   <p className="text-lg md:text-xl mt-2 text-gray-600">
    //                     {selectedPet.description}
    //                   </p>
    //                   <DialogDescription className="text-md md:text-lg mt-1 text-gray-500">
    //                     {selectedPet.breed} • {selectedPet.age}
    //                   </DialogDescription>
    //                 </DialogHeader>
    //               </div>
    //               <DialogFooter className="mt-4 md:mt-8 w-full">
    //                 <div className="group">
    //                   <div
    //                     className="relative h-12 w-40 md:h-16 md:w-48 rounded-sm mt-3 text-lg md:text-xl
    //                   border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
    //                   >
    //                     <span className="relative z-10 text-white sm:flex self-center">
    //                       <Button
    //                         onClick={() => {
    //                           if (!data.isSignedIn) {
    //                             toast({
    //                               title: "Нэвтэрч орно уу",
    //                               description: "Бүртгэлгүй бол бүртгүүлнэ үү",
    //                               action: (
    //                                 <ToastAction
    //                                   onClick={() => {
    //                                     push("/sign-in");
    //                                   }}
    //                                   altText="Goto schedule to undo"
    //                                 >
    //                                   нэвтрэх
    //                                 </ToastAction>
    //                               ),
    //                             });
    //                             return;
    //                           } else {
    //                             handleAdoptClick(selectedPet._id);
    //                           }
    //                         }}
    //                       >
    //                         adopt {selectedPet.name}
    //                       </Button>
    //                     </span>
    //                     <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
    //                   </div>
    //                 </div>
    //               </DialogFooter>
    //             </div>
    //           </motion.div>
    //         </DialogContent>
    //       )}
    //     </Dialog>
    //   </div>
    // </div>
  );
};

export default Petcard;
