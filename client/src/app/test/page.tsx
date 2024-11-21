"use client";

import { PetCard } from "@/components/mkae/Stripe";
import PetForm from "@/components/petAddAdoption/PetForm";

const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-orange-100 py-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/PetPage.jpg')` }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-7xl px-4">
        <PetForm />
        <PetCard />
      </div>
    </div>
  );
};

export default PetAddPage;
