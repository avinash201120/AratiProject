"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
// import { FaEye } from "react-icons/fa";


interface PromoCardProps {
  image: string;
  location: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export function PromoCard({
  image,
  location,
  title,
  description,
  startDate,
  endDate,
}: PromoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-2">{location}</div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="text-xs text-muted-foreground">
          <div>Start: {formatDate(startDate)}</div>
          <div>End: {formatDate(endDate)}</div>

          {/* Button with adjusted background color and icon color */}
          <div className="footer-flex mt-4">
            <button
              type="submit"
              className="btn btn-theme btn-rounded bg-[#13afae82] text-white flex items-center justify-center p-2"
            >
              <i
                className="fa-eye"
                aria-hidden="true"
                style={{
                  fontSize: "20px",
                  color: "#000", // Darker color for the icon (black)
                }}
              ></i>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PromoCardList() {
  const promoData = [
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      location: "New York",
      title: "Winter Wonderland",
      description: "Experience the magic of winter in the city.",
      startDate: "2023-12-01",
      endDate: "2024-01-15",
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      location: "Los Angeles",
      title: "Sunny Escapes",
      description: "Enjoy exclusive deals for beach lovers.",
      startDate: "2024-02-01",
      endDate: "2024-03-15",
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      location: "Chicago",
      title: "Spring Festivities",
      description: "Celebrate the blooming season with us.",
      startDate: "2024-04-01",
      endDate: "2024-05-15",
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      location: "Miami",
      title: "Summer Bash",
      description: "Don't miss the hottest events this summer.",
      startDate: "2024-06-01",
      endDate: "2024-07-31",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {promoData.map((promo, index) => (
        <PromoCard
          key={index}
          image={promo.image}
          location={promo.location}
          title={promo.title}
          description={promo.description}
          startDate={promo.startDate}
          endDate={promo.endDate}
        />
      ))}
    </div>
  );
}
