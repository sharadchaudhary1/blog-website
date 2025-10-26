"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Pagination from "@/components/pagination";
import { categories } from "@/services/constants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

 
  // filter by category
  useEffect(() => {
    async function getBlogs() {
      try {
        setLoading(true);

        const url =
          !selectedCategory ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?category=${encodeURIComponent(
                selectedCategory
              )}`;

        const res = await fetch(url);
        const data = await res.json();

        setBlogs(data.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    getBlogs();
  }, [selectedCategory]);

  // Save user 
  useEffect(() => {
    async function saveUser() {
      if (!user) return;

      const res = await fetch(`/api/create-user`, {
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (data.success) {
        console.log("User saved to database");
      } else {
        console.log(data.message);
      }
    }

    saveUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50   dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />


      <HeroSection/>

      {/*  Category  */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="max-w-7xl mx-auto py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-600">
            <p>Loading blogs...</p>
          </div>
        ) : blogs.length > 0 ? (
          <Pagination blogs={blogs} />
        ) : (
          <div className="text-center py-20 text-gray-600">
            <h2 className="text-xl font-semibold mb-2">No blogs found</h2>
            <p>Check back later for fresh content!</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
