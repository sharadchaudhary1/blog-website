"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-6">
      <div className="relative w-80 h-80 mb-6">
        <Image
          src="https://t4.ftcdn.net/jpg/05/94/58/39/360_F_594583957_XRfUZlycOmICMyRt7QPmpnQ0mTnfo5Ct.jpg"
          alt="Page not found illustration"
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        <Home className="w-4 h-4" />
        Go Back Home
      </Link>
    </div>
  );
}
