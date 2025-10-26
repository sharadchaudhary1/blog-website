import { db } from "@/db/client";
import { blogs } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  
    const id = params.id 

    if (!id ) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing blog ID" },
        { status: 400 }
      );
    }

    try{
    const result = await db.select().from(blogs).where(eq(blogs.id, id));
    const blog = result[0];

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.delete(blogs).where(eq(blogs.id, Number(params.id)));
    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, message: "Failed to delete blog" }, { status: 500 });
  }
}