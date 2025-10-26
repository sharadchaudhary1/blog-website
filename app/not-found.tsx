
"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-6">
     <img src="https://t4.ftcdn.net/jpg/05/94/58/39/360_F_594583957_XRfUZlycOmICMyRt7QPmpnQ0mTnfo5Ct.jpg" />
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
