import User from "@/models/admin/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found or invalid token" }),
      { status: 404 }
    );
  }

  user.isVerified = true;
  user.verificationToken = null; // Clear the token after verification
  await user.save();

  return new Response(
    JSON.stringify({ message: "Email verified successfully" }),
    { status: 200 }
  );
}
