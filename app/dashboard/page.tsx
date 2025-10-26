"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Edit, Eye, FileText, Trash2 } from "lucide-react";

type Blog = {
  id: number;
  title: string;
  category?: string | null;
  createdAt: string;
  urlToImage?: string | null;
  description?: string | null;
};

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/user-blogs");
      const data = await res.json();
      if (data.success) setBlogs(data.data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      } else {
        alert(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading your blogs...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto py-12 px-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Blogs
          </h1>
        </div>

        {/* Total Blogs */}
        <div className="mb-10">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" size={28} />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Blogs Posted</p>
                <h2 className="text-3xl font-bold text-gray-900">{blogs.length}</h2>
              </div>
            </div>
            {blogs.length > 0 && (
              <Link
                href="/create-blog"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                + Add New Blog
              </Link>
            )}
          </div>
        </div>

        {/* Blogs */}
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">You haven’t created any blogs yet.</p>
            <Link
              href="/create-blog"
              className="inline-block mt-5 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {blog.urlToImage ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.urlToImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    {blog.category && (
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full">
                        {blog.category}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                    {blog.title}
                  </h2>

                  {blog.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {blog.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-5">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
                    >
                      <Eye size={18} />
                      <span className="text-sm font-medium">View</span>
                    </Link>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/edit-blog/${blog.id}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit size={18} />
                        <span className="text-sm font-medium">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm font-medium">
                          {deleting === blog.id ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
