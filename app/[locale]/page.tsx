"use client";

import { ServiceCard } from "@/components/home/service-card";
import { SearchSection } from "@/components/home/search-section";
import { ProductCategory } from "@/components/home/product-category";
import { PromoCard } from "@/components/home/promo-card";
import { JobCard } from "@/components/home/job-card";
import { Footer } from "@/components/home/footer";
import { ContactSection } from "@/components/home/contact-section";
import { Header } from "@/components/home/header";
import { AmbassadorsSection } from "@/components/home/ambassadors-section";

const services = [
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Daily Help",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Assistance To People",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Children & Support",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Homes & Gardens",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Horeca & Leisure",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Cleaning & Maintenance",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Works & Repairs",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Green Spaces",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Facility Management",
  },
  {
    icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    title: "Expertise & Consulting",
  },
];

const categories = [
  { title: "FASHIONS & ACCESSORIES", count: 22 },
  { title: "HOUSES & GARDENS", count: 28 },
  { title: "TV, HOBBY & COMPUTING", count: 85 },
  { title: "BEAUTY, HEALTH & SPORTS", count: 79 },
];

const promotions = [
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Service Houses Section */}
        <section className="py-17 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="max-w-6xl mx-auto mt-8">
                {/* Logo Section */}
                <div className="text-center mb-4">
                  <span
                    className="font-weight-bold font-italic img-thumbnail pr-3 text-capitalize display-3"
                    style={{ borderRadius: "30px" }}
                  >
                    <div
                      className="inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center"
                      style={{ verticalAlign: "inherit" }}
                    >
                      <span
                        className="text-7xl italic font-bold"
                        style={{ color: "#13AFAE" }}
                      >
                        Proxy
                      </span>
                      <span
                        className="text-7xl italic font-bold"
                        style={{ color: "#2D3954" }}
                      >
                        Service
                      </span>
                    </div>
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">SERVICE HOUSES</h2>
                <p className="text-muted-foreground">How can we help you?</p>
              </div>
              <SearchSection />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* House of Commerce Section */}
        <section className="py-19 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span>
                <div
                  className="inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center mb-8"
                  style={{ verticalAlign: "inherit" }}
                >
                  <span
                    className="text-7xl italic font-bold"
                    style={{ color: "#13AFAE" }}
                  >
                    Proxy
                  </span>
                  <span
                    className="text-7xl italic font-bold"
                    style={{ color: "#2D3954" }}
                  >
                    Promo
                  </span>
                </div>
              </span>
              <h2 className="text-3xl font-bold mb-4">HOUSE OF COMMERCE</h2>
              <p className="text-muted-foreground">
                Discover our product categories.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <ProductCategory key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotions Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              DISCOVER OUR PROMOTIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promotions.map((promo, index) => (
                <PromoCard key={index} {...promo} />
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="py-19 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              JOBS & TROUBLESHOOTING NEEDS
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Jobs & Internships offered
                </h3>
                <div className="space-y-8">
                  <JobCard
                    title="Dental technician M/F/X"
                    description="We are looking for two dental technicians 1 for prosthesis ..."
                    date="2022-05-11 15:47:31"
                    salary="3500 €"
                    icon="https://dev.viaproxy.eu/images/jobchallenges/1657822513.png"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Needs & Missions proposed
                </h3>
                <div className="space-y-4">
                  <JobCard
                    title="Civil Engineer M/F/X"
                    description="Company Description General Contractor ..."
                    date="2022-05-13 09:41:06"
                    icon="https://dev.viaproxy.eu/images/besoins/1657820915.png"
                  />
                </div>
              </div>
            </div>
            <AmbassadorsSection />
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </div>
  );
}
