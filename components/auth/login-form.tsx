"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { setUser } from "@/store/slices/authSlice";
import { useTranslations } from "next-intl";

// Define the shape of the form data
interface LoginFormInputs {
  email: string;
  password: string;
}

// Define the validation schema using `yup`
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm() {
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema), // Use yupResolver with the schema
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true); // Show loader
    try {
      const res = await fetch("/api/authentication/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await res.json();
      if (res.ok) {
        console.log(responseData);
        dispatch(setUser(responseData.user));
        toast.success(`${t("loginButton")} ${t("successful")}`);
        router.push("/dashboard");
      } else {
        toast.error(responseData.error || t("invalidCredentials"));
      }
    } catch (error) {
      toast.error(t("unexpectedError"));
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center mt-6 space-y-2"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 border-blue-200 focus:border-blue-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-green-500" />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="pl-10 border-blue-200 focus:border-blue-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="mt-2 text-sm text-gray-600">
              <Link
                href="/authentication/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          <div>
            <div className="text-sm">
              <Link
                href="/authentication/forgetpassword"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Mail, Lock, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { setUser } from "@/store/slices/authSlice"; // Replace with your actual Redux action
// import { useTranslations } from "next-intl";
// // import { t } from "i18next"; // Replace with your actual translation library if needed

// export function LoginForm() {
//   // Define the shape of the form data
//   interface LoginFormInputs {
//     email: string;
//     password: string;
//   }

//   const t = useTranslations("login");
//   const { register, handleSubmit } = useForm<LoginFormInputs>(); // Specify the form type
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
//     setLoading(true); // Show loader
//     try {
//       const res = await fetch("/api/authentication/login", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });
//       const responseData = await res.json();
//       console.log(responseData);
//       if (res.ok) {
//         dispatch(setUser(responseData.user));
//         toast.success(`${t("loginButton")} ${t("successful")}`);
//         router.push("/dashboard");
//       } else {
//         toast.error(responseData.error || t("invalidCredentials"));
//       }
//     } catch (error) {
//       toast.error(t("unexpectedError"));
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col justify-center mt-6 space-y-2"
//     >
//       <div className="space-y-1">
//         <Label htmlFor="email">Email address</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
//           <Input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             className="pl-10 border-blue-200 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-3 h-5 w-5 text-green-500" />
//           <Input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             className="pl-10 border-blue-200 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
//           />
//           <label
//             htmlFor="remember-me"
//             className="ml-2 block text-sm text-gray-900"
//           >
//             Remember me
//           </label>
//         </div>

//         <div className="flex items-center justify-between">
//           <div>
//             <p className="mt-2 text-sm text-gray-600">
//               {/* Or{" "} */}
//               <Link
//                 href="/authentication/signup"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 create a new account
//               </Link>
//             </p>
//           </div>
//           <div>
//             <div className="text-sm">
//               <Link
//                 href="/forgot-password"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-green-500 hover:bg-green-600 text-white"
//       >
//         Sign in
//         <ArrowRight className="ml-2 h-4 w-4" />
//       </Button>
//     </form>
//   );
// }
