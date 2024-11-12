"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-primary bg-center lg:flex flex-col items-center gap-32 justify-between">
        <div className="flex justify-start items-center gap-4 w-4/5 h-[100px]">
          <Link href={"/"}>
            <img className="w-[50px] h-[50px]" src="/logo.png" alt="" />
          </Link>
          <Link href={"/"}>
            <img src="/pet-adopt.png" alt="" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-8xl text-wrap font-extrabold text-gray-900">
          Sign up to your account
        </h2>
        <Image
          src="/bg-1.png"
          alt="background image"
          width={550}
          height={500}
          className="h-[500px] w-[550px] object-cover"
        />
      </div>

      <div className="flex w-full items-center justify-center bg-[#FFDDD2] px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div></div>
          <div className="flex justify-center">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "hover:bg-primary",
                  footer: "w-[400px] h-[70px]",
                  footerAction: "w-[400px] h-[70px] mt-[90px]",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
