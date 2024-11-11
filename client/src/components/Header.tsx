"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import axios from "axios";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = useUser();
  useEffect(() => {});
  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
  };

  const pathname = usePathname();
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/sign-up/verify-email-address" ||
    pathname === "/sign-in/factor-one"
  ) {
    return null;
  }
  return (
    <>
      <header className="bg-background shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center">
                <img src="logo.png" alt="" />
              </Link>
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
            <nav className="hidden md:flex space-x-10">
              <Link
                href="/"
                className="text-base font-medium text-foreground hover:text-primary"
              >
                Нүүр
              </Link>
              <Link
                href="/petcard"
                className="text-base font-medium text-foreground hover:text-primary"
              >
                Үрчлэх
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-foreground hover:text-primary"
              >
                Холбоо барих
              </Link>
            </nav>
            <div className="hidden md:flex items-center gap-3 justify-end md:flex-1 lg:w-0">
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
                          label="Help"
                          labelIcon={<DotIcon />}
                          open="help"
                        />
                      </UserButton.MenuItems>
                      <UserButton.UserProfilePage
                        label="Help"
                        labelIcon={<DotIcon />}
                        url="/help"
                      >
                        <div>
                          <h1>Help Page</h1>
                          <p>This is the custom help page</p>
                        </div>
                      </UserButton.UserProfilePage>
                    </UserButton>
                  </SignedIn>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div>
          <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Нүүр
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Үрчлэх
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Холбоо барих
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
                            label="Help"
                            labelIcon={<DotIcon />}
                            open="help"
                          />
                        </UserButton.MenuItems>
                        <UserButton.UserProfilePage
                          label="Help"
                          labelIcon={<DotIcon />}
                          url="/help"
                        >
                          <div>
                            <h1>Help Page</h1>
                            <p>This is the custom help page</p>
                          </div>
                        </UserButton.UserProfilePage>
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
