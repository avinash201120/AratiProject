import { NextResponse } from "next/server";
import ProductForProductExchange from "@/models/student/ProductForProductExchange/ProductForProductExchangeModel";
import dbConnect from "@/utils/dbConnect";

await dbConnect();

// Fetch a specific exchange (GET)
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const exchange = await ProductForProductExchange.findById(id).populate(
//       "createdBy"
//     );
//     if (!exchange) {
//       return NextResponse.json(
//         { message: "Exchange not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(exchange, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error fetching exchange", error },
//       { status: 500 }
//     );
//   }
// }

// Update a specific exchange (PATCH)
// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const body = await req.json();
//     const updatedExchange = await ProductForProductExchange.findByIdAndUpdate(
//       id,
//       body,
//       {
//         new: true,
//       }
//     );
//     if (!updatedExchange) {
//       return NextResponse.json(
//         { message: "Exchange not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(updatedExchange, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating exchange", error },
//       { status: 500 }
//     );
//   }
// }

// // Fully update a specific exchange (PUT)
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const body = await req.json();
//     const updatedExchange = await ProductForProductExchange.findByIdAndUpdate(
//       id,
//       body,
//       {
//         new: true,
//         overwrite: true,
//       }
//     );
//     if (!updatedExchange) {
//       return NextResponse.json(
//         { message: "Exchange not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(updatedExchange, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating exchange", error },
//       { status: 500 }
//     );
//   }
// }

// // Delete a specific exchange (DELETE)
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const deletedExchange = await ProductForProductExchange.findByIdAndDelete(
//       id
//     );
//     if (!deletedExchange) {
//       return NextResponse.json(
//         { message: "Exchange not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Exchange deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error deleting exchange", error },
//       { status: 500 }
//     );
//   }
// }
