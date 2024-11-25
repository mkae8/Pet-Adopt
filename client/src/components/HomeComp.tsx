"use client";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

import axios from "axios";

import { ToastAction } from "@/components/ui/toast";
import {
  Heart,
  Home,
  Search,
  Menu,
  PawPrint,
  Rabbit,
  Fish,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";

import { ChevronDown, Dog, Cat, Bird, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Testimonials from "./Testimonials";
import { LuDog } from "react-icons/lu";
import { FaBone } from "react-icons/fa";
import { MdEmergencyRecording } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { useQueryState } from "nuqs";
export default function HomePage() {
  const { toast } = useToast();
  const data = useUser();
  const { push } = useRouter();

  interface UseInViewOptions {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
  }

  function useInView(
    ref: React.RefObject<HTMLDivElement>,
    options: UseInViewOptions = {}
  ) {
    const [isInView, setIsInView] = useState(false);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]);

    return isInView;
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, { threshold: 0.1 });

  const ref1 = useRef<HTMLDivElement | null>(null);

  const isInView1 = useInView(ref1, { threshold: 0.1 });
  const ref2 = useRef<HTMLDivElement | null>(null);

  const isInView2 = useInView(ref1, { threshold: 0.1 });

  const handleClick = (which: string) => {
    push(`/petcard?filter=${which}`);
  };

  return (
    <div className="flex flex-col items-center  ">
      <main className="flex-1 w-screen justify-center">
        <section className="w-full h-screen mt-[-72px] flex justify-center py-12 md:py-24 lg:py-32 xl:py-48 ]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full bg-black w-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/7546824/7546824-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="container px-4 z-10 flex  md:pl-10">
            <div className="flex flex-col items-center justify-center  md:items-start space-y-4 text-center">
              <motion.div
                ref={ref2}
                initial={{ opacity: 0, x: -100 }}
                animate={
                  isInView2 ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.7 }}
                className=""
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-center text-primary tracking-tighter sm:text-4xl  md:text-start md:text-5xl lg:text-6xl/none">
                    Төгс хамтрагчаа олоорой
                  </h1>
                  <p className="mx-auto max-w-[700px] text-xs text-white  md:text-start md:text-base dark:text-gray-400">
                    Тэжээвэр амьтанд хайраар дүүрэн гэр бүл бэлэглээрэй. Манай
                    үрчлэгдэх өхөөрдөм тэжээвэр амьтдыг үзэж, өнөөдрөөс эхлэн
                    тэжээвэр амьтдын эцэг эх болох аялалаа эхлүүлээрэй.
                  </p>
                </div>
                <div className="space-x-4 pt-4">
                  <Button
                    onClick={() => {
                      push("/petcard?filter=бүгд");
                    }}
                  >
                    Амьтан үрчлэх
                  </Button>
                  <Button
                    onClick={() => {
                      if (!data.isSignedIn) {
                        toast({
                          title: "Нэвтэрч орно уу",
                          description: "Бүртгэлгүй бол бүртгүүлнэ үү",
                          action: (
                            <ToastAction
                              onClick={() => {
                                push("/sign-in");
                              }}
                              altText="Goto schedule to undo"
                            >
                              нэвтрэх
                            </ToastAction>
                          ),
                        });
                      } else {
                        push("/pet-add-adoption");
                      }
                    }}
                    variant="outline"
                  >
                    Амьтан үрчлүүлэх
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="w-full max-w-[1200px] bg-[#1D2B32] p-4 rounded-sm flex flex-col md:w-screen md:flex-col gap-5 items-center justify-between">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-white text-2xl md:text-3xl font-bold">
                    Тэжээвэр амьтан хайх
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center justify-center mt-4 md:mt-0">
                  <Button
                    onClick={() => handleClick("Dog")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Dog className="mr-2 h-5 w-5" />
                    Find Your Dog
                  </Button>
                  <Button
                    onClick={() => handleClick("Cat")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Cat className="mr-2 h-5 w-5" />
                    Find Your Cat
                  </Button>
                  <Button
                    onClick={() => handleClick("bird")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Bird className="mr-2 h-5 w-5" />
                    Find Your Birds
                  </Button>
                  <Button
                    onClick={() => handleClick("Rabbit")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Rabbit className="mr-2 h-5 w-5" />
                    Find Your Rabbit
                  </Button>
                  <Button
                    onClick={() => handleClick("Hamster")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Rabbit className="mr-2 h-5 w-5" />
                    Find Your Hamster
                  </Button>{" "}
                  <Button
                    onClick={() => handleClick("fish")}
                    className="bg-orange-500 hover:bg-orange-600/90 text-white text-lg flex-1 h-[60px] md:h-[80px] w-full max-w-[200px]"
                  >
                    <Rabbit className="mr-2 h-5 w-5" />
                    Find Your Fish
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full mx-auto">
          <Testimonials />
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32  dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Өөрчлөлт хийх
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Одоо үрчилж авах боломжгүй байна бол тусламж хэрэгтэй амьтдад
                  сайн дурын ажил хийх эсвэл хандив өгөх талаар бодож үзээрэй.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={() => {
                    push("https://www.facebook.com/groups/961305777715556");
                  }}
                >
                  Сайн дурын ажилтан
                </Button>
                <Button
                  onClick={() => {
                    push("/donation");
                  }}
                  variant="outline"
                >
                  Хандив
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <img
            src="./topfooter.png"
            alt="Top Footer"
            className="w-full bg-[#f5f3eb]"
          />
          <div className="relative">
            <img
              className="w-screen h-[700px] object-cover"
              src="./footerbackground.png"
              alt="Footer Background"
            />

            {/* Main content container */}
            <div className="container absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center gap-10 w-full max-w-[690px] mx-auto">
              <FaPaw className="h-[40px] w-[40px] text-orange-500" />
              <p className="text-3xl font-bold tracking-tighter text-orange-500">
                Амьтан тэжээх сонирхолтой хүмүүст
              </p>
              <img
                className=" w-[100px] md:w-[400px] md:object-contain"
                src="./aaaa.png"
                alt="Interesting Animal Image"
              />
              <LuDog />
              <FaBone />
              <FaPaw />
              <FaStethoscope />
              <MdEmergencyRecording />
              <HiDocumentReport />
            </div>
            {/* Image on the right side */}
            <div className="container absolute top-56  transform translate-x-1/2 flex flex-col items-center justify-center text-center gap-10 w-full max-w-[690px] mx-auto">
              <div className="flex w-full  justify-center items-center"></div>
            </div>
          </div>

          <img
            src="./bottomshape.png"
            alt="Bottom Shape"
            className="w-full bg-[#f5f3eb]"
          />
        </section>

        <section className="w-full h-auto mx-auto flex flex-col gap-10">
          <div className="w-full mx-auto flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-10 w-full max-w-[690px] mt-20">
              <FaPaw className="h-[40px] w-[40px] text-orange-500" />
              <p className="text-3xl font-bold tracking-tighter text-orange-500 text-center">
                Амьтан тэжээх сонирхолтой хүмүүст
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row max-w-[1200px] mx-auto gap-10 md:gap-16">
            {/* First Column */}
            <div className="flex flex-col gap-10 flex-1">
              <div className="h-[200px] w-full max-w-[200px] mx-auto">
                <img
                  src="./one.jpeg"
                  alt="Choose Animal"
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="flex flex-col gap-5 text-center">
                <p className="text-xl font-bold tracking-tighter text-orange-500">
                  Амьтнаа сонгох
                </p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Одоо үрчилж авах боломжгүй байна бол тусламж хэрэгтэй амьтдад
                  сайн дурын ажил хийх эсвэл хандив өгөх талаар бодож үзээрэй.
                </p>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-10 flex-1">
              <div className="h-[200px] w-full max-w-[200px] mx-auto">
                <img
                  src="./two.jpeg"
                  alt="Get to Know Animal"
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="flex flex-col gap-5 text-center">
                <p className="text-xl font-bold tracking-tighter text-orange-500">
                  Амьтнаа таниж мэдэх
                </p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Одоо үрчилж авах боломжгүй байна бол тусламж хэрэгтэй амьтдад
                  сайн дурын ажил хийх эсвэл хандив өгөх талаар бодож үзээрэй.
                </p>
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col gap-10 flex-1">
              <div className="h-[200px] w-full max-w-[200px] mx-auto">
                <img
                  src="./three.jpeg"
                  alt="Get Them Used to Home"
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="flex flex-col gap-5 text-center">
                <p className="text-xl font-bold tracking-tighter text-orange-500">
                  Гэртээ дасгах
                </p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Одоо үрчилж авах боломжгүй байна бол тусламж хэрэгтэй амьтдад
                  сайн дурын ажил хийх эсвэл хандив өгөх талаар бодож үзээрэй.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// a
