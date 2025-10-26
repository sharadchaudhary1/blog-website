


"use client";

import React, { useState } from "react";
import BlogCard from "./blogcard";
import { InferSelectModel } from "drizzle-orm";
import { blogs } from "@/db/schema/blog";



type Blog = InferSelectModel<typeof blogs>;

interface PaginationProps {
  blogs: Blog[];
}

const Pagination= ({ blogs }: PaginationProps) => {
  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const maxVisibleButtons = 5;

  const getPageRange = (): number[] => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    const range: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Blogs  */}
      <div className="flex flex-wrap justify-center gap-5">
        {blogs.slice(start, end).map((blog, index) => (
          <BlogCard key={blog.id ?? index} blog={blog} />
        ))}
      </div>

      {/* buttons */}
      <div className="flex justify-center mt-10">
        {currentPage > 1 && (
          <button
            className="bg-gray-500 text-white rounded px-3 py-1.5 mx-1"
            onClick={() => updatePage(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {getPageRange().map((pageNum) => (
          <button
            key={pageNum}
            className={`rounded px-3 py-1.5 mx-1 ${
              currentPage === pageNum
                ? "bg-pink-600 text-white"
                : "bg-slate-600 text-white hover:bg-slate-700"
            }`}
            onClick={() => updatePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className="bg-gray-500 text-white rounded px-3 py-1.5 mx-1"
            onClick={() => updatePage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
