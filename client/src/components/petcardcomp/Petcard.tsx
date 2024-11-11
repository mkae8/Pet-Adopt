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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
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

  return (
    <div className="container mx-auto p-4 bg-light-pink">
      <h1 className="text-2xl font-bold mb-4">Pet Adoption</h1>
      <div className="mb-4 flex gap-4 ">
        {types.map((type, index) => (
          <div
            key={index}
            className="w-[95px] h-[52px] border rounded-full flex items-center justify-center gap-2 bg-white hover:bg-regal-blue transition ease-in-out duration-300"
          >
            <img
              className="h-[32px] w-[32px] rounded-full "
              src={type.imageUrl}
              alt=""
            />
            <div>{type.names}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pets.slice(0, sliceCount).map((pet) => (
            <div
              key={pet.id}
              className="cursor-pointer h-[380px] bg-white rounded-lg blur-[10]"
              onClick={() => openModal(pet)}
            >
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-[250px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <div className="ml-4 mt-2">
                <div className="text-2xl font-semibold">{pet.name}</div>
                <div className="text-xl font-normal ">{pet.breed}</div>
                <div className="text-lg">{pet.age}</div>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="flex flex-col self-center h-[68px] w-[175px] rounded-full mt-3"
          onClick={() => setSliceCount((prev) => prev + 8)}
        >
          See more
        </Button>
      </div>
      <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
        {selectedPet && (
          <DialogContent className="sm:max-w-[651px] ">
            <div className="flex">
              <img
                src={selectedPet.imageUrl}
                alt={selectedPet.name}
                className="w-[392px] h-[300px] rounded-lg shadow-md"
              />
              <div className="flex flex-col ml-3 justify-between">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="col-span-3">{selectedPet.description}</p>
                  </div>
                  <DialogHeader>
                    <DialogTitle>{selectedPet.name}</DialogTitle>
                    <DialogDescription>
                      {selectedPet.breed} • {selectedPet.age}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <div>
                  <DialogFooter>
                    <Button
                      className="flex flex-col justify-end"
                      type="submit"
                      onClick={closeModal}
                    >
                      Adopt {selectedPet.name}
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
