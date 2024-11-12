"use client";
import Link from "next/link";

import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { text } from "stream/consumers";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const { push } = useRouter();
  if (!user) {
    return (
      <div className="flex h-screen w-screen p-0 m-0 ">
        <div className="hidden w-1/2 bg-primary bg-center lg:flex flex-col items-center gap-32 justify-between">
          <div className="flex justify-start items-center gap-4 w-4/5 h-[100px]">
            <Link href={"/"}>
              <img className="w-[60px] h-[60px] mt-5" src="/logo.png" alt="" />
            </Link>
            <Link href={"/"}>{/* <img src="/pet-adopt.png" alt="" /> */}</Link>
          </div>
          <h2 className=" text-center text-8xl text-wrap font-extrabold text-[#FFDDD2]">
            Нэвтрэх
          </h2>
          <Image
            src="/bg-1.png"
            alt="background image"
            width={550}
            height={500}
            className="h-[500px] w-[550px] mb-40 object-cover"
          />
        </div>

        <div className="flex w-full items-center justify-center bg-[#FFDDD2] px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div></div>
            <div className="flex justify-center">
              <SignIn
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
  } else {
    push("/");
  }
}
