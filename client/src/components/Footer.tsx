"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { color } from "framer-motion";
import { useState } from "react";

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
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid-cols-1 md:grid-cols-4 flex gap-20">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-full flex flex-col items-center">
                <img
                  className="h-[128px] w-[94px]"
                  src="./logo.png"
                  alt="Logo"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Бидэнтэй холбоо барина уу
                </h3>

                <ul className="space-y-2 text-gray-300">
                  <li>Chinggis Ave 17 40, СБД - 1 хороо, Улаанбаатар 14240</li>
                  <li>Phone: (976) 99484778</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-300">
              Бид үйлчлүүлэгчиддээ хамгийн сайн үйлчилгээг үзүүлэхийн төлөө
              ажилладаг.гэрийн тэжээвэр амьтдыг хамгаалах, нийгэмд эерэг, зөв
              ойлголт түгээх, гудамжинд зовсон амьтангүй жаргалтай нийгмийг бий
              болгох зорилгоор 2013 оноос хойш үйл ажиллагаа явуулж байна.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Холбоо барих</h3>
            <form className="space-y-4">
              <input
                className={`footer-input w-full p-2 border-b focus:outline-none
                  focus:outline- `}
                name="Name"
                placeholder="Нэр"
              />

              <input
                className={`footer-input w-full p-2 border-b focus:outline-none`}
                name="Email"
                type="email"
                placeholder="email"
              />
              <textarea
                id="Your-Message"
                name="Your-Message"
                placeholder="Санал хүсэлтээ бичнэ үү..."
                className="footer-input w-full h-20 p-2 border rounded focus:outline-none"
                required
              />
              <button className="group w-full">
                <div
                  className="relative h-12 w-40 md:h-11 md:w-full text-lg md:text-xl
                   border border-orange-500 flex justify-center items-center overflow-hidden transition duration-300"
                >
                  <span className="relative z-10 text-[#F97316] group-hover:text-black">
                    илгээх
                  </span>
                  <span className="absolute inset-0 bg-[#F97316] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 "></span>
                </div>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
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
