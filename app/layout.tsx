import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/components/UserProvider";



export const metadata: Metadata = {
  title: "BlogSphere",
  description: "Discover amazing blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <SessionProvider>
        <UserProvider>

        {children}
        </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
