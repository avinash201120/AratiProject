"use client";

import Image from "next/image"; // Import Next.js Image component
import React, { useState, useEffect } from "react";
import { BoxSection } from "../home/BoxSection";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Slide Data
  const slides = [
    {
      id: 1,
      imageUrl: "https://dev.viaproxy.eu/img/services/marketplace.jpg",
      text: "Good deals and supportive neighbors",
      subtext: "Trusted neighbors ready to help you!",
    },
    {
      id: 2,
      imageUrl: "https://dev.viaproxy.eu/img/services/livreurs.jpg",
      text: "Eco-responsible deliveries",
      subtext: "Pick up your orders or have them eco-delivered!",
    },
    {
      id: 3,
      imageUrl: "https://dev.viaproxy.eu/img/services/promos.jpg",
      text: "Local promotions",
      subtext:
        "Take advantage of promotional checks from local merchants and artisans.",
    },
    {
      id: 4,
      imageUrl: "https://dev.viaproxy.eu/img/services/voisins.jpg",
      text: "Concierge services",
      subtext: "A community of professionals at your service!",
    },
  ];

  // Automatic sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://dev.viaproxy.eu/admin/assets/images/logo/login.png" // Replace with your logo path
              alt="Logo"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-evenly items-center">
            {[
              { label: "Welcome", id: "welcome", hasDropdown: false },
              {
                label: "House of Commerce",
                id: "house-of-commerce",
                hasDropdown: true,
              },
              {
                label: "House of Services",
                id: "house-of-services",
                hasDropdown: true,
              },
              { label: "ClubPromos", id: "clubpromos", hasDropdown: true },
              { label: "Local Houses", id: "local-houses", hasDropdown: true },
              {
                label: "Registration",
                id: "/authentication/signup",
                hasDropdown: false,
              },
              {
                label: "Login",
                id: "/authentication/signin",
                hasDropdown: false,
              },
            ].map(({ label, id, hasDropdown }, index) => (
              <div key={index} className="relative group">
                <a
                  href={`${id}`}
                  className="text-blue-950 hover:text-green-600 font-medium flex items-center"
                >
                  {label}
                </a>

                {/* Dropdown */}
                {hasDropdown && (
                  <div className="hidden group-hover:block absolute top-full mt-2 w-48 bg-white shadow-md rounded z-10">
                    {["Option 1", "Option 2", "Option 3"].map((item, idx) => (
                      <a
                        key={idx}
                        href={`${item.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 text-blue-950 hover:bg-green-100 hover:text-green-600"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-green-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md py-4 px-6">
          {["Welcome", "House of Commerce", "Services", "Promos", "Login"].map(
            (label, index) => (
              <a
                key={index}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                className="block text-blue-950 hover:text-green-600 font-medium py-2"
              >
                {label}
              </a>
            )
          )}
        </nav>
      )}

      {/* Carousel Section */}
      <div className="relative bg-gray-100 carousel-caption d-none d-md-block">
        <div className="relative h-96 overflow-hidden">
          <div
            className="flex transition-transform ease-in-out duration-700"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 w-full h-96 relative"
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.text}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
                {/* Carousel Caption */}
                <div className="carousel-caption d-none d-md-block absolute bottom-8 left-0 right-0 text-center text-white">
                  <h1 className="big-header-capt mb-0 second-color-viaproxy text-[#26b7b4] text-3xl font-bold">
                    {slide.text}
                  </h1>
                  <p className="text-center mb-4 text-white">{slide.subtext}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Boxes Section */}
      <BoxSection />
    </div>
  );
}
