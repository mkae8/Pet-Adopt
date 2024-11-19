"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { color } from "framer-motion";
import { useState } from "react";
import { FaHeadphonesAlt } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const excludedPaths = [
    "/sign-in",
    "/sign-up",
    "/application",
    "/sign-up/verify-email-address",
    "/sign-in//factor-one",
  ];

  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-[#eeece4] text-white relative flex flex-col ">
      <img
        src="./topfooter.png "
        className="footer-bg::before absolute top-[]"
        alt=""
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>
      <img src="./bottomfooter.png" alt="" />
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12  pt-8 p-8 w-screen bg-[#0a303a]  flex flex-col sm:flex-row justify-between">
        <div className="max-w-7xl mx-auto w-full flex justify-between   px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pet Adopt. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
          <div className="flex gap-5 text-4xl">
            <FaFacebook className="hover:text-gray-300 cursor-pointer" />
            <GrInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaGithub className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
{
  /* <p className="text-gray-300">
Бид үйлчлүүлэгчиддээ хамгийн сайн үйлчилгээг үзүүлэхийн төлөө
ажилладаг.гэрийн тэжээвэр амьтдыг хамгаалах, нийгэмд эерэг, зөв
ойлголт түгээх, гудамжинд зовсон амьтангүй жаргалтай нийгмийг бий
болгох зорилгоор 2013 оноос хойш үйл ажиллагаа явуулж байна.
</p> */
}

{
  /* <ul className="space-y-2 text-gray-300">
  <li>Chinggis Ave 17 40, СБД - 1 хороо, Улаанбаатар 14240</li>
  <li>Phone: (976) 99484778</li>
</ul>; */
}
