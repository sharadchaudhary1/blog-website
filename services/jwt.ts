
import jwt from "jsonwebtoken";

export function generateToken(data:string){
    const token=jwt.sign(data,process.env.JWT_SECRET)
    return token;
}


export function verifyToken(token:string){
     if (!token) {
    return null; 
  }
   const data=jwt.verify(token,process.env.JWT_SECRET)
   return data
}