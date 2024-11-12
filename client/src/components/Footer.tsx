"use client";

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/application" ||
    pathname === "/sign-up/verify-email-address" ||
    pathname === "/sign-in//factor-one"
  ) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pet Adopt</h2>
            <p className="text-gray-300">
              Бид үйлчлүүлэгчиддээ хамгийн сайн үйлчилгээг үзүүлэхийн төлөө
              ажилладаг.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Түргэн холбоосууд</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/adopt"
                  className="hover:text-gray-300 transition-colors"
                >
                  Adopt
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Бидэнтэй холбоо барина уу
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Chinggis Ave 17 40, СБД - 1 хороо, Улаанбаатар 14240</li>
              <li>Phone: (976) 99484778</li>
              <li>Email: Petadopt@gmail.com</li>
            </ul>
          </div>
          <div className="flex  gap-10">
            <div className="flex flex-col gap-5 text-4xl">
              <FaFacebook />
              <GrInstagram />
            </div>
            <div className="flex flex-col gap-5 text-4xl">
              <FaTwitter />
              <FaGithub />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pet Adopt . Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
}
