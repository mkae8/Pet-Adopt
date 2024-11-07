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
    imageUrl: "/placeholder.svg?height=200&width=200",
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Adoption</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="cursor-pointer"
            onClick={() => openModal(pet)}
          >
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedPet !== null} onOpenChange={closeModal}>
        {selectedPet && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedPet.name}</DialogTitle>
              <DialogDescription>
                {selectedPet.breed} • {selectedPet.age}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Description</Label>
                <p className="col-span-3">{selectedPet.description}</p>
              </div>
              <img
                src={selectedPet.imageUrl}
                alt={selectedPet.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={closeModal}>
                Adopt {selectedPet.name}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
