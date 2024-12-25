"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/authentication/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }

      const responseData = await res.json();
      toast.success(responseData.message || "Reset link sent to your email!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset link"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 border-purple-200 focus:border-purple-500"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Reset Link
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm font-medium text-green-500 hover:text-green-600"
        >
          Back to login
        </Link>
      </div>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Mail, ArrowRight, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import { forgotPasswordSchema } from "@/lib/validations/auth";
// import Link from "next/link";

// export const forgotPasswordSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),
// });

// type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

// export function ForgotPasswordForm() {
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ForgotPasswordForm>({
//     resolver: zodResolver(forgotPasswordSchema),
//   });

//   const onSubmit = async (data: ForgotPasswordForm) => {
//     setIsLoading(true);
//     // Simulate API call

//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="email">Email address</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
//           <Input
//             {...register("email")}
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             className="pl-10 border-purple-200 focus:border-purple-500"
//             disabled={isLoading}
//           />
//         </div>
//         {errors.email && (
//           <p className="text-sm text-red-500">{errors.email.message}</p>
//         )}
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-green-500 hover:bg-green-600 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Sending...
//           </>
//         ) : (
//           <>
//             Send Reset Link
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </>
//         )}
//       </Button>

//       <div className="text-center">
//         <Link
//           href="/"
//           className="text-sm font-medium text-green-500 hover:text-green-600"
//         >
//           Back to login
//         </Link>
//       </div>
//     </form>
//   );
// }
