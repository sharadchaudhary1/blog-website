import { db } from "@/db/client";
import { blogs } from "@/db/schema/blog";
import { ilike, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const searchparams=req.nextUrl.searchParams
    const query=searchparams.get('query')

        if(!query){
        return NextResponse.json({
            success:false,
            data:[],
            message:"no query given"
        })
    }

    try{
        const result = await db.select().from(blogs).where(
            or(
          ilike(blogs.title, `%${query}%`),
          ilike(blogs.content, `%${query}%`)
        )
      );

    return NextResponse.json({
      success: true,
      data: result,
    
    });
  

}
 catch (error:any) {
    console.error("Error fetching blogs:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while searching blogs",
        error: error.message,
      },
      { status: 500 }
    );
    }

}