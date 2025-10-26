


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { blogs } from "@/db/schema/blog";
import { eq } from "drizzle-orm";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params; 

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing blog ID" },
      { status: 400 }
    );
  }

  try {
    const result = await db.select().from(blogs).where(eq(blogs.id, Number(id)));
    const blog = result[0];

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing blog ID" },
      { status: 400 }
    );
  }

  try {
    const deleted = await db
      .delete(blogs)
      .where(eq(blogs.id, Number(id)))
      .returning({ id: blogs.id });

    if (deleted.length === 0) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      deletedId: deleted[0].id,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}