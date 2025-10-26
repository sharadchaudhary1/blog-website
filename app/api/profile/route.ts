
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { blogs, users } from "@/db/schema";
import GetCurrentUser from "@/services/get-current-user";
import { db } from "@/db/client";


export async function GET() {
  try {
    const currentUser = await GetCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

  
    const totalBlogs = await db.query.blogs.findMany({
      where: eq(blogs.authorId, currentUser.id),
    });

    return NextResponse.json({
      success: true,
      user:currentUser,
      totalBlogs: totalBlogs.length,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
