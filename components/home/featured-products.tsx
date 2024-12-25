import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    rating: 4.8,
    reviews: 1250,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: 449.99,
    rating: 4.9,
    reviews: 856,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Professional Camera Kit",
    price: 1299.99,
    rating: 4.7,
    reviews: 432,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2073",
    tag: "Premium",
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-gray-600">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900">
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <Button variant="outline">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
