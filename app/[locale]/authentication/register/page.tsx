"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  // production base url changed
  // update base url of production to https://viaproxy.vercel.app/
  // update base url of production to https://viaproxy.vercel.app
  // updated base url of prod to https://viaproxy-587n9r6fo-ganeshsadhashivams-projects.vercel.app/en

  // base url is prod https://viaproxy.vercel.app/en
  // base url to https://viaproxy.vercel.app
  const t = useTranslations("register"); // Load translations for the 'register' namespace
  const [loading, setLoading] = useState(false); // State to toggle loader
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true); // Show loader
    try {
      console.log("Form Data:", data);
      const response = await fetch("/api/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          t(
            "Registration Success Verification Email sent to your Registered Email"
          )
        ); // Use translation key
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || t("registrationFailed") // Use translation key
        );
      }
    } catch (error: any) {
      const errorMessage = error?.message || t("unexpectedError"); // Use translation key
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <section className="bg-white">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
          <Image
            src="/sale.jpg"
            layout="responsive"
            width={100}
            height={100}
            alt={t("registerImageAlt")} // Use translation key
            objectFit="cover"
          />
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("createAccount")}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: t("nameRequired") })}
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.name?.message as string}
                </p>
              </div>

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
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
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
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.password?.message as string}
                </p>
              </div>

              {/* Role Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("role")}
                </label>
                <select
                  id="role"
                  {...register("role", { required: t("roleRequired") })}
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                >
                  <option value="">{t("selectRole")}</option>
                  <option value="student">{t("student")}</option>
                  <option value="citizen">{t("citizen")}</option>
                  <option value="trader">{t("trader")}</option>
                </select>
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.role?.message as string}
                </p>
              </div>

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  {t("registerButton")}
                </button>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    href="/authentication/login"
                    className="text-gray-700 underline"
                  >
                    {t("login")}
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </section>
  );
}
