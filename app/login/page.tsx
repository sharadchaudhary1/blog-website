"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const router=useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success){
        alert("user is authenticated")
        router.push('/')
      }
      else{
        alert("unauthenticated user")
      }

    
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
   
      
        <h2 className="text-center font-semibold text-gray-500 mb-6 text-md">
          Log in to your BlogSphere account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white font-medium py-2 rounded-lg hover:bg-orange-700 transition-all disabled:opacity-70"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>


        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

       
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/get-started"
            className="text-orange-600 font-medium hover:underline hover:text-orange-500 transition-colors"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
