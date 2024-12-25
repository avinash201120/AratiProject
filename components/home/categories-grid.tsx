import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070",
    count: "1,200+ Products",
    color: "from-blue-600/80 to-blue-800/80",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071",
    count: "2,500+ Products",
    color: "from-purple-600/80 to-purple-800/80",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070",
    count: "1,800+ Products",
    color: "from-emerald-600/80 to-emerald-800/80",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070",
    count: "950+ Products",
    color: "from-rose-600/80 to-rose-800/80",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070",
    count: "750+ Products",
    color: "from-orange-600/80 to-orange-800/80",
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070",
    count: "1,100+ Products",
    color: "from-teal-600/80 to-teal-800/80",
  },
];

export function CategoriesGrid() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-gray-600">
            Browse our wide selection of products across popular categories
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[16/9]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color}`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-lg text-white/90">{category.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
