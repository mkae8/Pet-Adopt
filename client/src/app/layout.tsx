"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { localization } from "./util/localization";
import { useEffect } from "react";
import axios from "axios";
import UserControl from "@/components/userData/UserControl";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="en">
        <title>Pet Adoption</title>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <UserControl>
            <Toaster />
            <Header />

            {children}
            <div className="">
              <Footer />
            </div>
          </UserControl>
        </body>
      </html>
    </ClerkProvider>
  );
}
