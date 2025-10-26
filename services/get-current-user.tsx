

"use server"

import { auth } from "@/auth"
import { cookies } from "next/headers"
import { verifyToken } from "./jwt"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function GetCurrentUser() {
  const session = await auth()

  if (session?.user?.email) {
    const email = session.user.email;
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return user;
  }

  const cookie = await cookies()
  const token = cookie.get('token')?.value

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token)

  if (typeof decoded === 'string') {
    const email = decoded;
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    return existingUser;
  } else if (decoded && typeof decoded === 'object' && 'email' in decoded) {
    const email = decoded.email as string;
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    return existingUser;
  }

  return null;
}