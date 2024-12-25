export const runtime = "nodejs";

import { NextResponse } from "next/server";
import User from "@/models/admin/User";
import connect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  // Connect to the database
  await connect();
  try {
    const { email, password } = await req.json();
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Account not verified." },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "5h" } // Token expires in 1 hour
    );

    // Set the JWT token in an HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.firstName,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 18000, // Token expiry (1 hour)
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import User from "@/models/admin/User";
// import connect from "@/utils/dbConnect";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     // Connect to the database
//     await connect();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     if (!user.isVerified) {
//       return NextResponse.json(
//         { error: "Account not verified." },
//         { status: 403 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     // Set the JWT token in an HTTP-only cookie
//     const response = NextResponse.json({ message: "Login successful!" });
//     response.cookies.set("authToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 3600, // Token expiry (1 hour)
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { error: "An unexpected error occurred." },
//       { status: 500 }
//     );
//   }
// }

// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import User from "@/models/User";
// import connect from "@/utils/dbConnect";
// import bcrypt from "bcrypt";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     // Connect to the database
//     await connect();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Set response with cookies
//     const response = NextResponse.json({ message: "Login successful!" });
//     response.cookies.set("username", user.username, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { error: "An unexpected error occurred." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import User from "@/models/User";
// import connect from "@/utils/dbConnect";

// export async function POST(req: Request) {
//   await connect();
//   try {
//     // Parse request body
//     const { email, password } = await req.json();

//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if the user exists and is verified
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     if (!user.isVerified) {
//       return NextResponse.json(
//         { error: "Your account is not verified." },
//         { status: 403 }
//       );
//     }

//     // Validate the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid email or password." },
//         { status: 401 }
//       );
//     }

//     // Set username in cookie
//     const response = NextResponse.json(
//       { message: "Login successful!", username: user.username },
//       { status: 200 }
//     );
//     response.cookies.set("username", user.username, {
//       httpOnly: true, // Makes the cookie inaccessible to client-side scripts
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred." },
//       { status: 500 }
//     );
//   }
// }
