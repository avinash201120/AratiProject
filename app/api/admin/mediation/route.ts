import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Mediation } from "@/models/admin/Mediation";

export async function GET() {
  await connectToDatabase();
  try {
    const mediations = await Mediation.find();
    return NextResponse.json(mediations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
