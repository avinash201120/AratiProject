export async function PATCH() {}

// import { Trade } from "@/models/admin/Trade";
// import { NextRequest, NextResponse } from "next/server";

// // PATCH: Approve/Reject trade
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     const updatedTrade = await Trade.findByIdAndUpdate(
//       params.id,
//       { status: body.status },
//       { new: true }
//     );
//     return NextResponse.json(updatedTrade, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }
