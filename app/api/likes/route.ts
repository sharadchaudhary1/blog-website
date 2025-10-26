
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { likes } from "@/db/schema/likes";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { blogId, userId } = await req.json();

  if (!blogId || !userId)
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

 
  const existing = await db
    .select()
    .from(likes)
    .where(and(eq(likes.blogId, blogId), eq(likes.userId, userId)));

  if (existing.length > 0) {
    // Unlike
    await db.delete(likes).where(and(eq(likes.blogId, blogId), eq(likes.userId, userId)));
    return NextResponse.json({ success: true, liked: false });
  }


  await db.insert(likes).values({ blogId, userId });
  return NextResponse.json({ success: true, liked: true });
}
