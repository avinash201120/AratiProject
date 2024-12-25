import { Trade } from "@/models/admin/Trade";
import { NextResponse } from "next/server";

// GET: Fetch all trades
export async function GET() {
  try {
    const trades = await Trade.find();
    return NextResponse.json(trades, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
