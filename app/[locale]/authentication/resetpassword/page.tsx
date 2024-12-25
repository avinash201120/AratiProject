"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dynamic = "force-dynamic";

function ResetPasswordForm() {
  const searchParams = useSearchParams(); // Fetch search params dynamically
  const token = searchParams?.get("token"); // Handle token safely
  const router = useRouter(); // Hook for navigation
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/authentication/resetpassword`, {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Password reset successfully!");
        setTimeout(() => {
          router.push("/"); // Navigate to home page after success
        }, 3000); // Wait 3 seconds for the toast to display
      } else {
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white transition-colors ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
