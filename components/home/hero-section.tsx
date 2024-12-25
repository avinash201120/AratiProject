"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070",
    title: "Discover Latest Trends",
    subtitle: "Up to 50% off on new arrivals",
    cta: "Shop Now",
    color: "from-blue-600/90 to-blue-800/90",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    title: "Premium Electronics",
    subtitle: "Get the best deals on top brands",
    cta: "View Deals",
    color: "from-purple-600/90 to-purple-800/90",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070",
    title: "Luxury Collection",
    subtitle: "Exclusive designs for you",
    cta: "Explore More",
    color: "from-rose-600/90 to-rose-800/90",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full md:h-[70vh] lg:h-[80vh]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="mt-4 bg-white text-gray-900 hover:bg-white/90"
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
