"use client";

import { SocialButtons } from "@/components/auth/social-buttons";
import { LoginForm } from "@/components/auth/login-form";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Illustration */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/90 to-blue-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
            <p className="mt-4 text-lg text-white/90">
              Sign in to access your account and continue your journey with us.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View - Top Image Banner */}
      <div className="relative h-32 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/90 to-blue-600/90" />
        <Image
          src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8">
            {/* <SocialButtons /> */}

            {/* <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div> */}

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
