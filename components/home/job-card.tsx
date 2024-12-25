"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobCardProps {
  title: string;
  description: string;
  date: string;
  salary?: string;
  icon: string;
}

export function JobCard({
  title,
  description,
  date,
  salary,
  icon,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow mb-12">
      <CardContent className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image src={icon} alt={title} fill className="object-contain" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span>{new Date(date).toLocaleDateString()}</span>
          {salary && <span>{salary}</span>}
        </div>
        <Button className="w-50% bg-[#26B7B4] hover:bg-[#26B7B4]col-12 d-flex justify-content-end">
          <a
            href="#"
            className="btn btn-call_action_wrap bg-[#26B7B4] text-white py-2 px-6 rounded-md"
          >
            See more
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
