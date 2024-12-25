"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams(); // Fetch search params dynamically
  const token = searchParams?.get("token"); // Retrieve token from the URL
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Token is missing. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/authentication/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }), // Send only password and token
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to reset password");
      }

      const responseData = await res.json();
      toast.success(responseData.message || "Password reset successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          <Input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
            disabled={isLoading}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          <>
            Reset Password
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
// import { Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useSearchParams } from "next/navigation";

// export const resetPasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

// export function ResetPasswordForm() {
//   const searchParams = useSearchParams(); // Fetch search params dynamically
//   const token = searchParams?.get("token"); // Handle token safely
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordForm>({
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   const onSubmit = async (data: ResetPasswordForm) => {
//     console.log(data);
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/authentication/resetpassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, data }),
//       });

//       if (!res.ok) {
//         const errorResponse = await res.json();
//         throw new Error(errorResponse.message || "Failed to reset password");
//       }

//       const responseData = await res.json();
//       toast.success(responseData.message || "Password reset successfully!");
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "An unexpected error occurred"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="password">New Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>
//           <Input
//             {...register("password")}
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your new password"
//             className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
//             disabled={isLoading}
//           />
//         </div>
//         {errors.password && (
//           <p className="text-sm text-red-500">{errors.password.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword">Confirm Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>
//           <Input
//             {...register("confirmPassword")}
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm your new password"
//             className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
//             disabled={isLoading}
//           />
//         </div>
//         {errors.confirmPassword && (
//           <p className="text-sm text-red-500">
//             {errors.confirmPassword.message}
//           </p>
//         )}
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-teal-600 hover:bg-teal-700 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Resetting...
//           </>
//         ) : (
//           <>
//             Reset Password
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </>
//         )}
//       </Button>
//     </form>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// //import { resetPasswordSchema } from "@/lib/validations/auth";

// export const resetPasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

// export function ResetPasswordForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordForm>({
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   const onSubmit = async (data: ResetPasswordForm) => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setIsLoading(false);
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="password">New Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>
//           <Input
//             {...register("password")}
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your new password"
//             className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
//             disabled={isLoading}
//           />
//         </div>
//         {errors.password && (
//           <p className="text-sm text-red-500">{errors.password.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword">Confirm Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500" />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>
//           <Input
//             {...register("confirmPassword")}
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm your new password"
//             className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
//             disabled={isLoading}
//           />
//         </div>
//         {errors.confirmPassword && (
//           <p className="text-sm text-red-500">
//             {errors.confirmPassword.message}
//           </p>
//         )}
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-teal-600 hover:bg-teal-700 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Resetting...
//           </>
//         ) : (
//           <>
//             Reset Password
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </>
//         )}
//       </Button>
//     </form>
//   );
// }
