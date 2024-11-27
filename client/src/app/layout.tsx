"use client";

import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { localization } from "./util/localization";

import UserControl from "@/components/userData/UserControl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Nunito, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "1000"],
  style: ["normal", "italic"],
  display: "swap",
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
        <link rel="icon" type="image/png" href="/logo.png" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${nunito.variable} antialiased`}
        >
          <ToastContainer />
          <UserControl>
            <NuqsAdapter>
              <Toaster />
              <Header />
              {children}
              <Footer />
            </NuqsAdapter>
          </UserControl>
        </body>
      </html>
    </ClerkProvider>
  );
}
