"use client";

import { ForgotPasswordForm } from "@/components/auth/forget-password";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Illustration */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 to-purple-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070"
          alt="Forgot Password illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Forgot Your Password?
            </h1>
            <p className="mt-4 text-lg text-white/90">
              No worries! Enter your email and we&apos;ll send you instructions
              to reset your password.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View - Top Image Banner */}
      <div className="relative h-32 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 to-purple-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070"
          alt="Forgot Password illustration"
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
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
