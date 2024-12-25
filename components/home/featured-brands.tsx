import Image from "next/image";

const brands = [
  {
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070",
    discount: "Up to 40% Off",
  },
  {
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1964",
    discount: "New Arrivals",
  },
  {
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1771",
    discount: "Special Deals",
  },
  {
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974",
    discount: "Clearance Sale",
  },
];

export function BrandShowcase() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Featured Brands
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Shop from your favorite brands with exclusive offers
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-24">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                <p className="mt-1 text-sm text-purple-600">{brand.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
