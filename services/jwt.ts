


import jwt from "jsonwebtoken";

export function generateToken(data: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ email: data }, secret);
  return token;
}

export function verifyToken(token: string | undefined): string | jwt.JwtPayload | null {
  if (!token) {
    return null;
  }
  
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}