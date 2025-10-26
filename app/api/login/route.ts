import { db } from "@/db/client";
import { users } from "@/db/schema";
import { generateToken } from "@/services/jwt";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const body=await req.json()
    const {email}=body

    if(!email){
        return NextResponse.json({
            success:false,
            message:"Email is required "
        })
    }
   try{

       const [user]=await db.select().from(users).where(eq(users.email,email))
       const token =generateToken(user?.email)
       
       const res= NextResponse.json({
            success:true,
               data:user,
        })
        res.cookies.set('token',token)
        return res
   }
   catch(error){
    console.log(error)
    return NextResponse.json({success:false})
   }

}



