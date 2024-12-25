export async function PATCH() {}

// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "@/utils/dbConnect";
// import { Mediation } from "@/models/admin/Mediation";

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDatabase();
//   try {
//     const { resolution, status } = await request.json();
//     const mediation = await Mediation.findByIdAndUpdate(
//       params.id,
//       { resolution, status },
//       { new: true }
//     );
//     return NextResponse.json(mediation, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
