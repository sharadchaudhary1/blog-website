
import Image from "next/image";
import Header from "@/components/header";
import GetCurrentUser from "@/services/get-current-user";
import Comments from "@/components/comments";
import Footer from "@/components/footer";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
    cache: 'no-store'
  });
  const data = await res.json();
  const blog = data.data;

  const user = await GetCurrentUser();
  console.log(user);
     
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <article className="max-w-4xl mx-auto py-10 px-6">
        {/* Blog Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-snug">
            {blog.title}
          </h1>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500">
            <span>By <span className="font-medium text-gray-700">{blog.author}</span></span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}</span>
            {blog.source?.name && (
              <>
                <span>•</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                  {blog.source.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Blog Image */}
        {blog.urlToImage && (
          <div className="relative w-full h-96 mb-10 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={blog.urlToImage}
              alt={blog.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {blog.description && (
            <p className="text-lg font-medium text-gray-700 mb-6">
              {blog.description}
            </p>
          )}

          <p className="whitespace-pre-line">{blog.content}</p>
        </div>
        
        <Comments blogId={blog.id} userId={user?.id ?? null} />
      </article>
      
      <Footer />
    </div>
  );
}