"use client";

import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { localization } from "./util/localization";

import UserControl from "@/components/userData/UserControl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Nunito } from "next/font/google";

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
        <body className={`${nunito.variable} antialiased`}>
          <ToastContainer />
          <UserControl>
            <Toaster />
            <Header />
            {children}
            <Footer />
          </UserControl>
        </body>
      </html>
    </ClerkProvider>
  );
}
