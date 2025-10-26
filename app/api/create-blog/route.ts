

import { NextRequest, NextResponse } from "next/server";
import { blogs } from "@/db/schema/blog";
import { BlogSchema } from "@/lib/validation/blog";
import { db } from "@/db/client";
import GetCurrentUser from "@/services/get-current-user";

export async function POST(req: NextRequest) {
      try {
    const body = await req.json();

    // Validate input using Zod
    const parsed = BlogSchema.parse(body);

    const user=await GetCurrentUser()



    const insertedBlog = await db.insert(blogs).values( {...parsed,
      authorId: user?.id,}).returning();

    return NextResponse.json(
        {     
            success:true,
            message :"Blog created successfully"
        }
    );
  } catch (err: any) {
    console.error("Failed to create blog:", err);

    
    if (err.name === "ZodError") {
      return NextResponse.json(
        { message: "Validation error",
            success:false,
            errors: err.errors 
        },
   
      );
    }

    return NextResponse.json(
      { message: "Failed to create blog", 
        success:false,
        error: err.message
     },
    
    );
  }
}
