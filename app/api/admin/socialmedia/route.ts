import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { SocialMedia } from "@/models/admin/Socialmedia";

export async function GET() {
  await connectToDatabase();
  try {
    const links = await SocialMedia.find();
    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await connectToDatabase();
  try {
    const updates = await request.json();
    const updatedLinks = await SocialMedia.updateMany({}, updates, {
      new: true,
    });
    return NextResponse.json(updatedLinks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
