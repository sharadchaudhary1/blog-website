


import { NextRequest, NextResponse } from "next/server";
import { blogs } from "@/db/schema/blog";
import { BlogSchema } from "@/lib/validation/blog";
import { db } from "@/db/client";
import GetCurrentUser from "@/services/get-current-user";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();


    const parsed = BlogSchema.parse(body);

  
    const user = await GetCurrentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: user not found" },
        { status: 401 }
      );
    }


    const insertedBlog = await db
      .insert(blogs)
      .values({
        ...parsed,
        authorId: user.id,
      })
      .returning();

    return NextResponse.json(
      {
        data: insertedBlog,
        success: true,
        message: "Blog created successfully",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Failed to create blog:", err);

    // Handle Zod validation 
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          success: false,
          error: err,
        },
        { status: 400 }
      );
    }

    //  Handle errors
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      {
        message: "Failed to create blog",
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
