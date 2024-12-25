"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

// Define types for props
interface AmbassadorCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const ambassadorCards: AmbassadorCardProps[] = [
  {
    title: "Sports",
    subtitle: "& Passions",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Struggle",
    subtitle: "against poverty",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Help",
    subtitle: "to success",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Protection",
    subtitle: "Animals",
    imageUrl:
      "https://images.unsplash.com/photo-1508675800979-0ef26e47b0f6?w=800&auto=format&fit=crop&q=60",
  },
];

export function AmbassadorCard({
  title,
  subtitle,
  imageUrl,
}: AmbassadorCardProps) {
  return (
    <Card className="flex-1 relative overflow-hidden group mb-8">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-[300px] object-cover brightness-50 group-hover:scale-105 transition-transform duration-300"
        width={500}
        height={300}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-white/80">{subtitle}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 bottom-4 text-white hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </Card>
  );
}

export function AmbassadorSection() {
  return (
    <section
      className="h-auto py-16 bg-[#122947]"
      style={{
        backgroundImage:
          "url(https://dev.viaproxy.eu/admin/assets/img/pattern.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="row justify-center">
          <div className="col-lg-7 col-md-8">
            <div className="sec-heading text-center text-white">
              <h2 className="text-3xl font-bold">
                Our Ambassadors & Supporters
              </h2>
              <p className="text-white/80 mt-2">
                All our contributors are driven by the desire to support
                training, employability, local commerce and living well and
                building together!
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {ambassadorCards.map((card, index) => (
              <AmbassadorCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>

          {/* Left Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg"
          >
            <ChevronLeft className="h-6 w-6 text-[#1e2749]" />
          </Button>

          {/* Right Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-lg"
          >
            <ChevronRight className="h-6 w-6 text-[#1e2749]" />
          </Button>
        </div>
      </div>
    </section>
  );
}
