import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Home, Search, Menu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/placeholder.svg')]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Your Perfect Companion
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Give a loving home to a pet in need. Browse our adorable
                  adoptable pets and start your journey to pet parenthood today.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Find a Pet</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Featured Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buddy</CardTitle>
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
                  <p className="mt-2">Friendly Labrador, 3 years old</p>
                </CardContent>
                <CardFooter>
                  <Button>Meet Buddy</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Whiskers</CardTitle>
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
                  <p className="mt-2">Playful Tabby, 2 years old</p>
                </CardContent>
                <CardFooter>
                  <Button>Meet Whiskers</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hoppy</CardTitle>
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
                  <p className="mt-2">Gentle Lop Rabbit, 1 year old</p>
                </CardContent>
                <CardFooter>
                  <Button>Meet Hoppy</Button>
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Paw Pals Adoption. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
