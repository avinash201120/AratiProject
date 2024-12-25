import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "@/models/admin/User";
import sendEmail from "@/utils/sendEmail";
import { NextRequest } from "next/server";
import connect from "@/utils/dbConnect";

export async function POST(req: NextRequest) {
  await connect(); // Ensure the database connection is established

  try {
    const { name, email, password, role } = await req.json();
    console.log("Received Data:", { name, email, password, role });

    // Validate required fields
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already exists in the system." }),
        { status: 409 } // Conflict status code
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = uuidv4();

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate verification link
    const verificationLink = `${process.env.BASE_URL}/authentication/verify?token=${verificationToken}`;
    console.log("Verification Link:", verificationLink);

    // Send verification email
    await sendEmail(
      email,
      "Verify Your Email",
      `
        <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>
      `
    );

    // Return success response
    return new Response(
      JSON.stringify({ message: "User created. Verification email sent." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error);

    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).message
        : "An unknown error occurred";

    // Return error response
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}
