import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <NextAuthProvider>
          <main>{children}</main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
