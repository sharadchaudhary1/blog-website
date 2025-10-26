

import { NextResponse } from "next/server"
import { db } from "@/db/client"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { userSchema } from "@/lib/validation/user"

export async function POST(req: Request) {
  try {
    const body = await req.json()

     const result = userSchema.safeParse(body);
     
     if (!result.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { name, email, image } =  result.data;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" })
    }

    const existing = await db.select().from(users).where(eq(users.email, email))

    if (existing.length > 0) {
      return NextResponse.json({ success: false, message: "User already exists" })
    }

    await db.insert(users).values({ name, email, image })
    return NextResponse.json({ success: true, message: "User created" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: "Internal server error" })
  }
}
