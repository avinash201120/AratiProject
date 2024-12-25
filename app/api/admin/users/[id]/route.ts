// url:api/admin/users/:id
// For PUT (update), PATCH (status), and DELETE

// import { NextRequest, NextResponse } from "next/server";
// import UserModel from "@/models/admin/User";

export async function PUT() {}
// PUT: Update user details
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     const updatedUser = await UserModel.findByIdAndUpdate(params.id, body, {
//       new: true,
//     });
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// PATCH: Activate/Deactivate user
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       params.id,
//       { status: body.status },
//       { new: true }
//     );
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

export async function PATCH() {}
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();

//     // Validate status
//     const allowedStatuses = ["active", "inactive"];
//     if (body.status && !allowedStatuses.includes(body.status)) {
//       return NextResponse.json(
//         {
//           error: `Invalid status. Allowed values are: ${allowedStatuses.join(
//             ", "
//           )}`,
//         },
//         { status: 400 }
//       );
//     }

//     // Validate role
//     const allowedRoles = [
//       "admin",
//       "student",
//       "merchant",
//       "promoter",
//       "ecoCitizen",
//     ];
//     if (body.role && !allowedRoles.includes(body.role)) {
//       return NextResponse.json(
//         {
//           error: `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`,
//         },
//         { status: 400 }
//       );
//     }

//     // Update the user with provided fields (status and/or role)
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       params.id,
//       {
//         ...(body.status && { status: body.status }),
//         ...(body.role && { role: body.role }),
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json(
//       { error: "Failed to update user" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE() {}
// DELETE: Remove a user
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await UserModel.findByIdAndDelete(params.id);
//     return NextResponse.json(
//       { message: "User deleted successfully" },
//       { status: 204 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }
