import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Alert } from "@/models/admin/Alert";

export async function GET() {
  await connectToDatabase();
  try {
    const alerts = await Alert.find();
    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
