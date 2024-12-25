"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const supporters = [
  {
    title: "Cities & Towns",
    description:
      "Cities and towns are fundamental partners for our community because they represent the essence of the local economy.",
  },
  {
    title: "Entrepreneurs & Associations",
    description:
      "Entrepreneurs and associations invested in solidarity in the promotion of the local economy represent privileged partners for our actions.",
  },
  {
    title: "Schools & Universities",
    description:
      "One of the major objectives of our actions concerns the training through work of students in favor of the local economy via relevant internships.",
  },
  {
    title: "Traders & Craftmens",
    description:
      "Local merchant and service provider associations constitute the central core of our actions in favor of the local economy as a whole.",
  },
];

export function AmbassadorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % supporters.length);
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % supporters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 1 ? supporters.length - 2 : prevIndex - 2
    );
  };

  // Logic to determine the range of items to show based on currentIndex
  const displayedSupporters = supporters.slice(currentIndex, currentIndex + 2);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#1e2749] mb-4">
          OUR AMBASSADORS & SUPPORTERS
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          All our contributors are driven by the desire to support training,
          employability, local commerce and living well and building together!
        </p>

        <div className="relative overflow-hidden">
          <div
            className="grid grid-cols-2 gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {displayedSupporters.map((item, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div className="_testimonial_flex_first">
                  <h3
                    className="text-xl font-bold text-[#1e2749] mb-4 flex-grow flex items-center justify-center"
                    style={{ verticalAlign: "middle" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>

          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-lg z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
