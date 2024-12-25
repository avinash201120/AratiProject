"use client";

import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <div className="bg-[#19bb39c7] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              Do you have any questions?
            </h2>
            <p>We will help you find what you are looking for</p>
          </div>
          <Button
            variant="outline"
            className="text-black border-white hover:bg-white/10 rounded-medium"
          >
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
}
