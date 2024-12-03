"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = useUser();


  useEffect(() => {});

  const DotIcon = () => {
    return (
      <img
        src="https://www.svgrepo.com/show/408711/sent-send-mail-message-envelope.svg"
        alt=""
      />
    );
  };
  const DotIcon2 = () => {
    return (
      <img
        className="-rotate-90 scale-x-[-1]"
        src="https://www.svgrepo.com/show/408711/sent-send-mail-message-envelope.svg"
        alt=""
      />
    );
  };
  const DotIcon1 = () => {
    return (
      <img
        src="https://www.svgrepo.com/show/308787/pet-care-service-pet-grooming-service.svg"
        alt=""
      />
    );
  };

  const pathname = usePathname();
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/sign-up/verify-email-address" ||
    pathname === "/application" ||
    pathname === "/sign-in/factor-one" ||
    pathname === "/sign-in/factor-one" ||
    pathname === "/sign-up/continue" ||
    pathname === "/sign-in/sso-callback"
  ) {
    return null;
  }

  return (
    <>
      <header className="bg-white sticky  top-0 z-50">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between  items-center py-4 md:justify-start md:space-x-10">
            <Link href="/" className="flex items-center">
              <img
                src="logo.png"
                alt=""
                className="w-[35px] h-[35px] rounded-xl"
              />
            </Link>
            <div className="flex justify-start h-10  lg:w-0 lg:flex-1 items-center">
              <nav className="hidden  md:flex gap-5">
                <Link
                  href="/"
                  className="w-12 hover:nav_link nhome_link btn_text font-bold "
                >
                  Нүүр
                </Link>
                <Link
                  href="/petcard?filter=бүгд"
                  className="w-36 hover:nav_link nhome_link btn_text  font-bold"
                >
                  Амьтан үрчлэх
                </Link>
                <Link
                  href={user.isSignedIn ? `pet-add-adoption` : `sign-in`}
                  className="w-44 hover:nav_link nhome_link btn_text font-bold"
                >
                  Амьтан үрчлүүлэх
                </Link>
                <Link
                  href="/adoptedpet"
                  className="w-44 hover:nav_link nhome_link btn_text font-bold"
                >
                  Үрчлэгдсэн амьтад
                </Link>
              </nav>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Button
                variant="ghost"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaX /> : <GiHamburgerMenu />}
              </Button>
            </div>

            <div className="hidden md:flex items-center gap-3 justify-end md:flex-1 lg:w-0">
              {user.isLoaded ? (
                <div className="bg-black cursor-pointer text-primary-foreground hover:bg-slate-800 h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                  <SignedOut>
                    <SignInButton>нэвтрэх</SignInButton>
                  </SignedOut>
                  <SignedIn>
                    {user.user?.username}
                    <UserButton>
                      <UserButton.MenuItems>
                        <UserButton.Action
                          label="Таны явуулсан хүсэлтүүд"
                          labelIcon={<DotIcon />}
                          onClick={() => {
                            router.push("/my-request");
                          }}
                        />
                        <UserButton.Action
                          label="Танд ирсэн хүсэлтүүд"
                          labelIcon={<DotIcon2 />}
                          onClick={() => {
                            router.push("/requests");
                          }}
                        />
                        <UserButton.Action
                          label="Таны үрчлүүлэх амьтад"
                          labelIcon={<DotIcon1 />}
                          onClick={() => {
                            router.push("/adoptpet");
                          }}
                        />
                      </UserButton.MenuItems>
                    </UserButton>
                  </SignedIn>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <img
            src="./test.png "
            className="absolute left-0 bottom-[-13px] md:bottom-[-40px]  w-[100%] h-[24px] md:h-[52px] z-0 bg-repeat  bg-center"
            alt=""
          />
        </div>

        {/* Mobile menu */}
        <div>
          <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Нүүр
              </Link>
              <Link
                href="/petcard?filter=бүгд"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Амьтан үрчлэх
              </Link>
              <Link
                href={user.isSignedIn ? `pet-add-adoption` : `sign-in`}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Амьтан үрчлүүлэх
              </Link>
              <Link
                href="/adoptedpet"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Үрчлэгдсэн амьтад
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-muted">
              <div className="px-2 flex flex-row gap-3">
                {user.isLoaded ? (
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    <SignedOut>
                      <SignInButton>нэвтрэх</SignInButton>
                    </SignedOut>
                    <SignedIn>
                      {user.user?.username}

                      <UserButton>
                        <UserButton.MenuItems>
                          <UserButton.Action
                            label="Таны явуулсан хүсэлтүүд"
                            labelIcon={<DotIcon />}
                            onClick={() => {
                              router.push("/my-request");
                              setIsMenuOpen(false);
                            }}
                          />
                          <UserButton.Action
                            label="Танд ирсэн хүсэлтүүд"
                            labelIcon={<DotIcon2 />}
                            onClick={() => {
                              router.push("/requests");
                              setIsMenuOpen(false);
                            }}
                          />
                          <UserButton.Action
                            label="Таны үрчлүүлэх амьтад"
                            labelIcon={<DotIcon />}
                            onClick={() => {
                              router.push("/adoptpet");
                              setIsMenuOpen(false);
                            }}
                          />
                        </UserButton.MenuItems>
                      </UserButton>
                    </SignedIn>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
