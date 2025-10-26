

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { categories } from "@/services/constants";
import Image from "next/image";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [category, setCategory] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();

        if (data.success && data.data) {
          const blog = data.data;
          setTitle(blog.title);
          setDescription(blog.description || "");
          setContent(blog.content || "");
          setUrlToImage(blog.urlToImage || "");
          setCategory(blog.category || "");
          setSourceName(blog.source?.name || "");
          setSourceId(blog.source?.id || "");
        } else {
          setError("Blog not found");
        }
      } catch {
        setError("Failed to load blog data.");
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Submit edited blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const updatedBlog = {
      title,
      description: description || null,
      content,
      category,
      urlToImage: urlToImage || null,
      source: {
        id: sourceId || null,
        name: sourceName || "",
      },
    };

    try {
      const res = await fetch(`/api/edit-blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      const data = await res.json();

      if (data.success) {
        alert("Blog updated successfully!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Failed to update blog.");
      }
    } catch {
      setError("Something went wrong while updating.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching)
    return <p className="text-center text-gray-600 mt-10">Loading blog...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            value={urlToImage}
            onChange={(e) => setUrlToImage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {urlToImage && (
            <Image
              src={urlToImage}
              alt="Preview"
              width={192} 
              height={192}
              className="mt-3 rounded-lg border border-gray-300 object-cover"
            />
          )}
        </div>

        {/* Markdown Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Content *
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={showPreview ? "" : "lg:col-span-2"}>
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={400}
                preview={showPreview ? "preview" : "edit"}
              />
            </div>

            {showPreview && (
              <div className="border border-gray-300 rounded-lg p-4 overflow-auto max-h-[500px] bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Preview:
                </h3>
                <MDEditor.Markdown source={content || "*No content yet*"} />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}