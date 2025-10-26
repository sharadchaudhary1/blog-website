


import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { blogs } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import GetCurrentUser from "@/services/get-current-user";

export async function GET() {
  try {
    const user = await GetCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.authorId, user.id))
      .orderBy(blogs.createdAt);

    return NextResponse.json({ success: true, data: userBlogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
