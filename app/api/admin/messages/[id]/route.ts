export async function DELETE() {}

// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "@/utils/dbConnect";
// import { Message } from "@/models/admin/Message";

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDatabase();
//   try {
//     await Message.findByIdAndDelete(params.id);
//     return NextResponse.json(
//       { message: "Message deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
