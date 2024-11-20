"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaHeadphonesAlt,
} from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

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
    <footer className="bg-[#eeece4] text-white relative flex flex-col">
      <Image
        src="/topfooter.png"
        alt=""
        width={1920}
        height={100}
        className="w-full"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="Pet Adopt Logo"
              width={94}
              height={128}
            />

            <div className="mt-6 text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 text-[#0a303a]">
                Холбоосууд
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="hover:text-orange-600 transition-colors text-[#0a303a]"
                >
                  Нүүр
                </Link>
                <Link
                  href="/petcard"
                  className="hover:text-orange-600 transition-colors text-[#0a303a]"
                >
                  Үрчлэх
                </Link>
                <Link
                  href="/"
                  className="hover:text-orange-600 transition-colors text-[#0a303a]"
                >
                  Үрчлэгдсэн амьтад
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 flex justify-center items-center rounded-full bg-orange-500 text-white">
                  <FaHeadphonesAlt className="h-8 w-8 text-[#0a303a]" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-bold text-[#0a303a]">
                    <a
                      href="tel:+97699484778"
                      aria-label="Call us at (976) 99484778"
                    >
                      (976) 99484778
                    </a>
                  </div>
                  <div className="text-xl text-orange-600 font-serif">
                    <a href="tel:+97699484778">Call now</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 flex justify-center items-center rounded-full bg-orange-500 text-white">
                  <IoLocationOutline className="h-8 w-8 text-[#0a303a]" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base sm:text-xl font-bold text-[#0a303a]">
                    <a
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Чингисийн өргөн чөлөө 17 40, СБД - 1 хороо, Улаанбаатар
                      14240
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#0a303a] text-base sm:text-lg mt-6">
              Бид үйлчлүүлэгчиддээ хамгийн сайн үйлчилгээг үзүүлэхийн төлөө
              ажилладаг.гэрийн тэжээвэр амьтдыг хамгаалах, нийгэмд эерэг, зөв
              ойлголт түгээх, гудамжинд зовсон амьтангүй жаргалтай нийгмийг бий
              болгох зорилгоор 2013 оноос хойш үйл ажиллагаа явуулж байна.
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/bottomfooter.png"
        alt=""
        width={1920}
        height={100}
        className="w-full"
      />
      <div className="bg-[#0a303a] py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Pet Adopt. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
          <div className="flex gap-5 text-3xl sm:text-4xl">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="hover:text-gray-300 cursor-pointer" />
            </a>
            <a href="#" aria-label="Instagram">
              <GrInstagram className="hover:text-gray-300 cursor-pointer" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub className="hover:text-gray-300 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
