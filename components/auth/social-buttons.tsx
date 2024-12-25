"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Github } from "lucide-react";

export function SocialButtons() {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full hover:bg-[#4285f4]/10 border-[#4abe5a]"
        onClick={() => {}}
      >
        <Github className="mr-2 h-4 w-4 text-[#000000]" />
        <span className="text-[#000000]">Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full hover:bg-[#1877F2]/10 border-[#4abe5a]"
        onClick={() => {}}
      >
        <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
        <span className="text-[#000000]">Continue with Facebook</span>
      </Button>
    </div>
  );
}
