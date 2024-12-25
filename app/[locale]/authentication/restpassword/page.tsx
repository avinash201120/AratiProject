"use client";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import Image from "next/image";

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Illustration */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/90 to-teal-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070"
          alt="Reset Password illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Create New Password
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Your new password must be different from previously used passwords
              and meet our security requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View - Top Image Banner */}
      <div className="relative h-32 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/90 to-teal-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070"
          alt="Reset Password illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Set New Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please create a strong password that includes uppercase,
              lowercase, numbers, and is at least 8 characters long.
            </p>
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
