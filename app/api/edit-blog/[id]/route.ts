

import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { db } from "@/db/client";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    await db.update(blogs)
      .set({
        title: body.title,
        description: body.description,
        content: body.content,
        category: body.category,
        urlToImage: body.urlToImage,
        source: body.source,
      })
      .where(eq(blogs.id, Number(params.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: "Failed to update blog" }, { status: 500 });
  }
}


