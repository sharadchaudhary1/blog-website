

"use server"

import { auth } from "@/auth"
import { cookies } from "next/headers"
import { verifyToken } from "./jwt"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"


export default async function GetCurrentUser() {

const session = await auth()


  if(session){
  const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, session?.user?.email),
    });

  return user
  }


   const cookie= await cookies()
  const token=cookie.get('token')?.value


 const decode=verifyToken(token)

  const email=decode?.email
  if (!email) {
    return null; 
  }


  const existingUser = await db.query.users.findFirst({
  where: eq(users.email, email),
});
  
return existingUser
}
