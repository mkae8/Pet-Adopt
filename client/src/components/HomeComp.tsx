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

import { ToastAction } from "@/components/ui/toast";
import { Heart, Home, Search, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { toast } = useToast();
  const data = useUser();
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/headerbanner-1.jpg')]">
          <div className="container px-4 md:pl-10">
            <div className="flex flex-col items-center  md:items-start space-y-4 text-center">
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
                    push("/adopt");
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
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Онцлох тэжээвэр амьтад
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Нохой</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Buddy the dog"
                    className="w-full h-60 object-cover rounded-md"
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
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Муур</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Whiskers the cat"
                    className="w-full h-60 object-cover rounded-md"
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
              <Card>
                <CardHeader>
                  <CardTitle>Туулай</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Hoppy the rabbit"
                    className="w-full h-60 object-cover rounded-md"
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
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Why Adopt?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Heart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Save a Life</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  By adopting, you're giving a deserving animal a second chance
                  at a happy life.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Home className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Gain a Companion</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Adopted pets make wonderful, loving companions and lifelong
                  friends.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-bold mb-2">
                  Support Animal Welfare
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your adoption supports our efforts to rescue and care for
                  animals in need.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Make a Difference
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Can't adopt right now? Consider volunteering or making a
                  donation to support our mission.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Volunteer</Button>
                <Button variant="outline">Donate</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// a
