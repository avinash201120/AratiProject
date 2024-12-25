import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Message } from "@/models/admin/Message";

export async function GET() {
  await connectToDatabase();
  try {
    const messages = await Message.find();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
