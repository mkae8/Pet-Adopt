"use client";


import { motion } from "framer-motion";
import PetAddModal from "./PetAddModal";


// Хуудсын үндсэн хэсэг
const PetAddPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center w-full h-full bg-gray-100 relative"
    >
      <img
        src="/PetPage.png"
        alt="Pet Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 mb-10">
        <PetAddModal />
      </div>
    </motion.div>
  );
};

export default PetAddPage;
