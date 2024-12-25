"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to toggle loader
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true); // Show loader
    try {
      const res = await fetch("/api/authentication/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await res.json();
      console.log(responseData);
      if (res.ok) {
        dispatch(setUser(responseData.user));
        toast.success(t("loginButton") + " " + t("successful"));
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
    <section className="bg-white relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
          <Image
            src="/Login.jpg"
            layout="responsive"
            width={100}
            height={100}
            alt="login"
          />
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("welcomeBack")}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{t("logInToContinue")}</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
              noValidate
            >
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("invalidEmailFormat"),
                    },
                  })}
                  className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <p className="text-sm text-red-500 mt-1">
                  {errors.email?.message as string}
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength"),
                    },
                  })}
                  className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <p className="text-sm text-red-500 mt-1">
                  {errors.password?.message as string}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white transition-colors ${
                  errors.email || errors.password
                    ? "bg-red-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {t("loginButton")}
              </button>

              {/* Links */}
              <div className="flex justify-between mt-4 text-sm">
                <Link
                  href="/authentication/forgotpassword"
                  className="text-blue-500 hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
                <Link
                  href="/authentication/register"
                  className="text-blue-500 hover:underline"
                >
                  {t("registerPrompt")}
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
