

"use client";

import React, { useEffect, useState, useCallback } from "react";

type User = {
  id: string;
  name: string;
  image?: string | null;
};

type CommentItem = {
  id: number;
  blogId: number;
  userId: string;
  content: string;
  createdAt: string;
  user?: User | null;
};

export default function Comments({
  blogId,
  userId,
}: {
  blogId: string | number;
  userId: string | null;
}) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  Wrapped in useCallback to fix  missing dependency warning
  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/comments?blogId=${encodeURIComponent(String(blogId))}`, {
        method: "GET",
      });

      const body: { success: boolean; data?: CommentItem[] } = await res.json();

      if (body.success && Array.isArray(body.data)) {
        setComments(body.data);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      const message =
        err instanceof Error ? err.message : "Unable to load comments";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!userId) {
      setError("You must be signed in to post a comment.");
      return;
    }

    setPosting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          blogId: String(blogId),
          content: newComment.trim(),
          userId,
        }),
      });

      const body: { success: boolean; message?: string } = await res.json();

      if (!body.success) {
        throw new Error(body.message || "Failed to post comment");
      }

      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
      const message =
        err instanceof Error ? err.message : "Failed to post comment";
      setError(message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={userId ? "Write a comment..." : "Sign in to comment"}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          disabled={!userId || posting}
        />
        <button
          type="submit"
          disabled={posting || !userId}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70"
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </form>

      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

      {loading ? (
        <div className="text-sm text-gray-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-800">{c.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {c.user?.name || "Anonymous"},{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
