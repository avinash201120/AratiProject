"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dynamic = "force-dynamic";

function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");
  const [message, setMessage] = useState("Verifying...");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setMessage("Invalid or missing token.");
        setIsSuccess(false);
        toast.error("Invalid or missing token.");
        return;
      }

      try {
        const res = await fetch(`/api/authentication/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage("Email verified successfully!");
          setIsSuccess(true);
          toast.success("Email verified successfully!");
          setTimeout(() => {
            router.push("/"); // Navigate to home page after success
          }, 3000);
        } else {
          setMessage(data.error || "Verification failed.");
          setIsSuccess(false);
          toast.error(data.error || "Verification failed.");
        }
      } catch (error) {
        setMessage("An error occurred during verification.");
        setIsSuccess(false);
        toast.error("An error occurred during verification.");
      }
    }

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <div className="flex items-center justify-center mb-4">
          {isSuccess === true && (
            <span className="text-green-500 text-4xl mr-2">✓</span>
          )}
          {isSuccess === false && (
            <span className="text-red-500 text-4xl mr-2">✗</span>
          )}
          <p className="text-gray-700 text-lg">{message}</p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
