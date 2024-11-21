"use client";

import PetForm from "@/components/petAddAdoption/PetForm";
import { PetCard } from "../mkae/Stripe";

const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen  ">
      <div
        className="absolute inset-0  w-screen h-screen bg-cover object-contain"
        style={{ backgroundImage: `url('/create.png')` }}
        aria-hidden="true"
      />
      <div className="relative inset-0 z-10 w-full  ">
        <PetForm />
        <PetCard />
      </div>
    </div>
  );
};

export default PetAddPage;
