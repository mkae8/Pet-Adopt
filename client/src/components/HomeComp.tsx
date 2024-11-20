"use client";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

import { ToastAction } from "@/components/ui/toast";
import { Heart, Home, Search, Menu, PawPrint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDown, Dog, Cat, Bird, MapPin } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="flex flex-col items-center  ">
      <main className="flex-1 w-screen justify-center">
        <section className="w-full h-screen mt-[-72px] flex justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/headerbanner-1.jpg')]">
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
                <div className="space-x-4 ">
                  <Button
                    onClick={() => {
                      push("/petcard");
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
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              {/* <nav className="w-full bg-[#1D2B32] p-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className="relative flex-1 min-w-[240px]">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter City, State, or Zip"
                      className="pl-9 bg-white/10 border-0 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 flex-[2] gap-2">
                    <Button className="bg-[#E55C4D] hover:bg-[#E55C4D]/90 text-white h-full">
                      <Dog className="mr-2 h-5 w-5" />
                      Find Your Dog
                    </Button>
                    <Button
                      variant="ghost"
                      className="bg-[#E55C4D] hover:bg-[#E55C4D]/90 text-white h-full"
                    >
                      <Cat className="mr-2 h-5 w-5" />
                      Find Your Cat
                    </Button>
                    <Button className="bg-[#E55C4D] hover:bg-[#E55C4D]/90 text-white h-full">
                      <Bird className="mr-2 h-5 w-5" />
                      Find Your Birds
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="bg-[#1D2B32] text-white border border-white/20 hover:bg-white/10">
                        Find Other Pets
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Small & Furry</DropdownMenuItem>
                      <DropdownMenuItem>Scales, Fins & Other</DropdownMenuItem>
                      <DropdownMenuItem>Barnyard</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </nav> */}
            </motion.div>
          </div>
        </section>
        <section className="w-full ">
          <div>
            <img
              className="w-screen h-[780px]"
              src="./footerbackground.png"
              alt=""
            />
          </div>
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
                <Button>Сайн дурын ажилтан</Button>
                <Button variant="outline">Хандив</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// a

{
  /* <div className="container px-4 md:px-6">
            <motion.div
              ref={ref1}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className=""
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                Яагаад тэжээвэр амьтан үрчлэх вэ?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 1 }}
                className=""
              >
                <div className="flex flex-col items-center text-center">
                  <Heart className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Амьдрал аврах</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Үрчилж авснаар та амьтадад аз жаргалтай хоёр дахь боломжийг
                    олгоно.
                  </p>
                </div>
              </motion.div>
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 1.2 }}
                className=""
              >
                <div className="flex flex-col items-center text-center">
                  <Home className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    Үнэнч хамтрагчтай болох
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Үрчлэгдсэн тэжээвэр амьтад нь хайраар дүүрэн хамтрагч болж,
                    насан туршийн амьдралын найзууд болдог.
                  </p>
                </div>
              </motion.div>
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 1.4 }}
                className=""
              >
                <div className="flex flex-col items-center text-center">
                  <PawPrint className="h-12 w-12 mb-4 text-primary " />
                  <h3 className="text-xl font-bold mb-2">
                    Амьтны халамжийг дэмжинэ
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Тусламж хэрэгтэй амьтдыг аврах, халамжлах.
                  </p>
                </div>
              </motion.div>
            </div>
          </div> */
}
