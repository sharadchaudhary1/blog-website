import { db } from "@/db/client";
import { blogs } from "@/db/schema/blog";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

   const searchParams=req.nextUrl.searchParams
    const category = searchParams.get("category");

    let allBlogs;

    if (category ) {

      allBlogs = await db
        .select()
        .from(blogs)
        .where(eq(blogs.category, category))
        .orderBy(desc(blogs.createdAt));
    } else {
   
      allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    }

    return NextResponse.json({ success: true, data: allBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
