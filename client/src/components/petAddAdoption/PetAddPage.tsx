"use client";

import PetForm from "@/components/petAddAdoption/PetForm";
import { Stripe } from "../mkae/Stripe";

const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen min-h-screen  ">
      <div
        className="absolute inset-0  w-screen h-screen bg-cover object-contain"
        style={{ backgroundImage: `url('/create.png')` }}
        aria-hidden="true"
      />
      <div className="relative inset-0 z-10 w-screen flex-col  ">
        <PetForm />
        <Stripe />
      </div>
    </div>
  );
};

export default PetAddPage;
