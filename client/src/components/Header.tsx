"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-background shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center">
                <span className="sr-only">Your Company</span>
                <svg
                  className="h-8 w-auto sm:h-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
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
              <Button>login</Button>
              <Button>Register</Button>
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
                About
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              >
                Services
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
                <Button>login</Button>
                <Button>Register</Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
