"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";



export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<{ totalBlogs: number }>({ totalBlogs: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/profile", {
        credentials: "include", 
        cache: "no-store", 
      });


      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setStats({ totalBlogs: Number(data.totalBlogs) || 0 });
      } else {
        setUser(null);
        setError(data.message || "Not authenticated");
      }
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      setError(err?.message || "Failed to load profile");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // spinner 
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  // Loading  UI
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200">
          <div className="flex gap-6 items-center">
            <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/5 animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>

          <div className="border-t border-gray-200 my-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <div className="bg-blue-50 rounded-xl py-6">
              <div className="h-10 bg-blue-100 rounded w-16 mx-auto animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse" />
            </div>
            <div className="bg-green-50 rounded-xl py-6">
              <div className="h-10 bg-green-100 rounded w-16 mx-auto animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if no user login
  if (!user) {
    return (
      <div className="text-center mt-10 px-4">
        <p className="text-gray-600 mb-4">{error || "You need to log in to view your profile."}</p>
        <div className="flex justify-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
          >
            {loading ? <Spinner /> : null}
            Retry
          </button>
        </div>
      </div>
    );
  }

  //  when user is login
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User avatar"}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined on{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="flex justify-center sm:justify-start gap-3 mt-4">
              <Link
                href="/edit-profile"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

     
        <div className="border-t border-gray-200 my-8"></div>

        {/* totalblogs  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-blue-50 rounded-xl py-6">
            <p className="text-3xl font-bold text-blue-700">{stats.totalBlogs}</p>
            <p className="text-gray-600 font-medium">Blogs Posted</p>
          </div>
          <div className="bg-green-50 rounded-xl py-6">
            <p className="text-3xl font-bold text-green-700">100%</p>
            <p className="text-gray-600 font-medium">Profile Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}