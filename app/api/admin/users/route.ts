// url:api/admin/users
// For GET (all users) and POST (create user)

import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/admin/User";
import connect from "@/utils/dbConnect";

// GET: Fetch all users
export async function GET() {
  try {
    await connect();
    const users = await UserModel.find();
    console.log("in api call to get users", users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = new UserModel(body);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
