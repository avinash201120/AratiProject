import User from "@/models/admin/User";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/utils/sendEmail";
import connect from "@/utils/dbConnect";

export async function POST(req: Request) {
  await connect();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ error: "No account found with that email." }),
      { status: 404 }
    );
  }

  const resetToken = uuidv4();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.BASE_URL}/authentication/restpassword?token=${resetToken}`;
  await sendEmail(
    email,
    "Password Reset Request",
    `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  );

  return new Response(
    JSON.stringify({ message: "Password reset link sent to your email." }),
    { status: 200 }
  );
}

// import User from "@/models/admin/User";
// import { v4 as uuidv4 } from "uuid";
// import sendEmail from "@/utils/sendEmail";
// import connect from "@/utils/dbConnect";

// export async function POST(req: Request) {
//   await connect();
//   const { email } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) {
//     return new Response(
//       JSON.stringify({ error: "No account found with that email." }),
//       { status: 404 }
//     );
//   }

//   const resetToken = uuidv4();
//   user.resetPasswordToken = resetToken;
//   user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//   await user.save();

//   const resetLink = `${process.env.BASE_URL}/authentication/resetpassword?token=${resetToken}`;
//   await sendEmail(
//     email,
//     "Password Reset Request",
//     `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//   );

//   return new Response(
//     JSON.stringify({ message: "Password reset link sent to your email." }),
//     { status: 200 }
//   );
// }
