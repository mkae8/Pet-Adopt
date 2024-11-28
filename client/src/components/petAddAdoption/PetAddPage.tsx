"use client";

import { useState, useEffect } from "react";
import PetForm from "@/components/petAddAdoption/PetForm";
import { Stripe } from "@/components/mkae/Stripe";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type Pet = {
  _id: string;
  image?: string[];
  petName?: string;
  petCategoryId?: string;
  age?: string;
  sex?: string;
  size?: string;
  weight?: string;
  status?: string;
  vaccinated?: string;
  location?: string;
  description?: string;
};

export default function PetAddPage() {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchPets = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axios.get<Pet[]>(
        `${process.env.BACKEND_URL}/pets/user/${user.id}`
      );

      setPets(response.data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Алдаа",
        description:
          "Амьтдын мэдээллийг авахад алдаа гарлаа. Дахин оролдоно уу.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-orange-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('/create.png')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 opacity-70 " />
        <div className="relative z-10 w-full h-full mt-8 overflow-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <div className=" rounded-lg  p-6 mb-8 lg:mb-0  border-orange-300">
                  <PetForm fetchData={fetchPets} />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className=" rounded-lg  p-6  border-orange-300">
                  <Stripe fetchData={fetchPets} loading={loading} pets={pets} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="mb-20">
        <img
          src="./bottomshape.png"
          alt="Bottom Shape"
          className="w-full bg-gradient-to-r from-orange-100 to-orange-200"
        />
      </div>
    </div>
  );
}
