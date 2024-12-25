import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "@/models/admin/User";
import sendEmail from "@/utils/sendEmail";
import { NextRequest } from "next/server";
import connect from "@/utils/dbConnect";

export async function POST(req: NextRequest) {
  await connect(); // Ensure the database connection is established

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      country,
      town,
      school,
      schoolCategory,
    } = await req.json();

    console.log("Received Data:", {
      firstName,
      lastName,
      email,
      password,
      role,
      country,
      town,
      school,
      schoolCategory,
    });

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    // If the role is "student", validate school and schoolCategory
    if (
      role === "student" &&
      (!school ||
        school.trim() === "" ||
        !schoolCategory ||
        schoolCategory.trim() === "")
    ) {
      return new Response(
        JSON.stringify({
          error: "School and School Category are required for students.",
        }),
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

    // Define the type for the user data
    interface NewUserData {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string;
      country: string;
      town: string;
      verificationToken: string;
      school?: string;
      schoolCategory?: string;
    }

    // Create a new user instance
    const newUserData: NewUserData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      country,
      town,
      verificationToken,
    };

    // Include school and schoolCategory if the role is "student"
    if (role === "student") {
      newUserData.school = school;
      newUserData.schoolCategory = schoolCategory;
    }

    const newUser = new User(newUserData);

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
