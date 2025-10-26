



import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { comments } from "@/db/schema/comments";
import { InferSelectModel } from "drizzle-orm";


type CommentRow = InferSelectModel<typeof comments>;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json().catch(() => null)) as
      | { blogId?: number | string; content?: string; userId?: string }
      | null;

    const blogIdRaw = body?.blogId;
    const content = body?.content;
    const userId = body?.userId;

    if (!blogIdRaw || !content || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields: blogId, content and userId are required.",
        },
        { status: 400 }
      );
    }

    const blogId = Number(blogIdRaw);
    if (!Number.isInteger(blogId) || blogId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid blogId" },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Content must be a non-empty string." },
        { status: 400 }
      );
    }


    const insertResult = await db
      .insert(comments)
      .values({
        blogId,
        content: content.trim(),
        userId,
      })
      .returning({ id: comments.id });

    const createdId = insertResult?.[0]?.id ?? null;

    // fetch all  the  comment
    const createdComment = createdId
      ? await db.query.comments.findFirst({
          where: (c, { eq }) => eq(c.id, createdId),
          with: { user: true },
        })
      : await db.query.comments.findFirst({
          where: (c, { and, eq }) =>
            and(
              eq(c.blogId, blogId),
              eq(c.userId, userId),
              eq(c.content, content.trim())
            ),
          orderBy: (c, { desc }) => desc(c.createdAt),
          with: { user: true },
        });

    if (!createdComment) {
      return NextResponse.json(
        { success: false, message: "Failed to create comment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: createdComment },
      { status: 201 }
    );
  } catch (err) {

    console.error("POST /api/comments error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const blogIdRaw = req.nextUrl.searchParams.get("blogId");
    if (!blogIdRaw) {
      return NextResponse.json(
        { success: false, message: "Missing blogId query parameter." },
        { status: 400 }
      );
    }

    const blogId = Number(blogIdRaw);
    if (!Number.isInteger(blogId) || blogId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid blogId" },
        { status: 400 }
      );
    }

    const allComments: (CommentRow & { user?: unknown })[] =
      await db.query.comments.findMany({
        where: (c, { eq }) => eq(c.blogId, blogId),
        with: { user: true },
        orderBy: (c, { desc }) => desc(c.createdAt),
      });

    return NextResponse.json({ success: true, data: allComments });
  } catch (err) {
 
    console.error("GET /api/comments error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
