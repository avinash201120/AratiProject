import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use your secret key from environment variables

/**
 * Decodes the token and extracts the user ID.
 * @param req - Next.js request object
 * @returns User ID or null if invalid
 */
export const getUserIdFromToken = (req: NextRequest): string | null => {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    console.log("Decoded Token User ID:", decoded.id); // Log userId for debugging
    return decoded.id;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
