"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = async () => {
    const { data } = await axios.get("/api/user");

    console.log(data);
  };

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
                Home
              </Link>
              <Link
                href="/Adopt"
                className="text-base font-medium text-foreground hover:text-primary"
              >
                Adopt
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-foreground hover:text-primary"
              >
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center gap-3 justify-end md:flex-1 lg:w-0">
              <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
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
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Adopt
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Contact
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-muted">
              <div className="px-2 flex flex-row gap-3">
                <Button>Login</Button>
                <Button>Register</Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
