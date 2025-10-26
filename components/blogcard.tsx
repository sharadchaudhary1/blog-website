"use client";

import Link from "next/link";
import {  Calendar, BookOpenCheck } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { blogs } from "@/db/schema/blog";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";

type Blog = InferSelectModel<typeof blogs>;

const BlogCard = ({ blog }: { blog: Blog }) => {


  //get user by using a zustand 
    const { user } = useUserStore();


  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article className="group  w-[32%] min-w-[320px] max-w-[380px] bg-card rounded-xl overflow-hidden   blog-hover-lift flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/blog/${blog.id}`} className=" h-full flex flex-col">
        {/* Image */}
        {blog.urlToImage && (
          <div className="relative w-full aspect-video overflow-hidden">
           <Image
              src={blog.urlToImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          

         
          </div>
        )}

        {/*title */}
        <div className="flex-1 p-5 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h2>

          {blog.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {blog.description}
            </p>
          )}
        
        {/* source,date */}
          <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span className="font-medium truncate max-w-[100px]">{blog.source?.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            <span className="font-medium text-primary/70">{estimateReadTime(blog.content)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
