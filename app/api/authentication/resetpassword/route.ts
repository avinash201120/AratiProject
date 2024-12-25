import User from "@/models/admin/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  console.log(password);

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Invalid or expired token." }),
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return new Response(
    JSON.stringify({ message: "Password reset successful." }),
    {
      status: 200,
    }
  );
}
