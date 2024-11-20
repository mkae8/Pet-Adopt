"use client";

import PetForm from "@/components/petAddAdoption/PetForm";
import { useEffect } from "react";

const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-orange-100 ">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/PetPage.jpg')` }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full ">
        <PetForm />
      </div>
    </div>
  );
};

export default PetAddPage;
