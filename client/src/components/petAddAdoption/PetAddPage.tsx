"use client";

import PetForm from "@/components/petAddAdoption/PetForm";

const PetAddPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-orange-100 py-12">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url('/PetPage.jpg')` }}
        aria-hidden="true"
      />
      <div className="relative inset-0 z-10 w-full  ">
        <PetForm />
      </div>
    </div>
  );
};

export default PetAddPage;
