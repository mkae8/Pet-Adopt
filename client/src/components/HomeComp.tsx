"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import { ToastAction } from "@/components/ui/toast";
import { Heart, Home, Search, Menu, PawPrint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    console.log(isInView);

    return isInView;
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, { threshold: 0.1 });

  const ref1 = useRef<HTMLDivElement | null>(null);

  const isInView1 = useInView(ref1, { threshold: 0.1 });
  const ref2 = useRef<HTMLDivElement | null>(null);

  const isInView2 = useInView(ref1, { threshold: 0.1 });

  return (
    <div className="flex flex-col items-center min-h-screen">
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
              src="https://cdn.prod.website-files.com/660ec32bbacc0061824a8104/664295fa0468ba64ee2b4259_Video%20landing%20hd%20Loop-transcode.mp4"
              type="video/mp4"
            />
          </video>
          <div className="container px-4 z-10  md:pl-10">
            <div className="flex flex-col items-center  md:items-start space-y-4 text-center">
              <motion.div
                ref={ref2}
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView2 ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.5 }}
                className=""
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl  md:text-start md:text-5xl lg:text-6xl/none">
                    төгс хамтрагчаа олоорой
                  </h1>
                  <p className="mx-auto max-w-[700px] text-xs text-gray-500  md:text-start md:text-base dark:text-gray-400">
                    тэжээвэр амьтанд хайраар дүүрэн гэр бүл бэлэглээрэй. Манай
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
                    амьтан үрчлэх
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
                    амьтан үрчлүүлэх
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Онцлох тэжээвэр амьтад
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
                className=""
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Нохой</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt="Buddy the dog"
                      className="w-full h-60 sm:h-48 object-cover rounded-md"
                      height="300"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s"
                      style={{
                        aspectRatio: "400/300",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                  </CardContent>
                  <CardFooter>
                    <Link href={"/buddy-list"}>
                      <Button>Meet Buddy</Button>
                    </Link>
                  </CardFooter>{" "}
                </Card>
              </motion.div>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1 }}
                className=""
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Муур</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt="Whiskers the cat"
                      className="w-full h-60 sm:h-48 object-cover rounded-md"
                      height="300"
                      src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
                      style={{
                        aspectRatio: "400/300",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                  </CardContent>
                  <CardFooter>
                    <Link href={"/whiskers-list"}>
                      <Button>Meet Whiskers</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1.5 }}
                className=""
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Туулай</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt="Hoppy the rabbit"
                      className="w-full h-60 sm:h-48 object-cover rounded-md"
                      height="300"
                      src="https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg"
                      style={{
                        aspectRatio: "400/300",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                  </CardContent>
                  <CardFooter>
                    <Link href={"/bunny-list"}>
                      <Button>Meet Hoppy</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
                transition={{ duration: 2 }}
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
                transition={{ duration: 3 }}
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
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
