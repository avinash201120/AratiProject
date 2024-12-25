"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ProductCategoryProps {
  title: string;
  count: number;
}

export function ProductCategory({ title, count }: ProductCategoryProps) {
  return (
    <Card className="hover:bg-[#004a6f] transition-colors cursor-pointer bg-[#13AFAE] text-white w-64 h-40 rounded-lg shadow-lg">
      <CardContent className="flex justify-center items-center p-6 text-center">
        <div>
          <h3 className="font-semibold text-lg mb-2 uppercase">{title}</h3>
          <p className="text-sm">{count} Produits</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductCategories() {
  const categories = [
    { title: "Modes & Accessoires", count: 22 },
    { title: "Maisons & Jardins", count: 28 },
    { title: "TV, Hobby & Informatique", count: 85 },
    { title: "Beauté, Santé & Sports", count: 79 },
  ];

  return (
    <div className="text-center">
      {/* Header Section */}
      <div className="mb-8">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-4">
          <div className="text-5xl font-extrabold text-[#004a6f]">
            Promo<span className="text-[#13AFAE]">Proxy</span>
          </div>
        </div>

        {/* Subtitle Section */}
        <h2 className="text-2xl font-semibold text-[#004a6f] mb-1">
          MAISON DES COMMERCES
        </h2>
        <p className="text-gray-500 text-sm">
          Découvrez nos catégories de produits.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {categories.map((category, index) => (
          <ProductCategory
            key={index}
            title={category.title}
            count={category.count}
          />
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-8">
        <button className="w-12 h-12 bg-[#13AFAE] hover:bg-[#004a6f] text-white rounded-full shadow-lg flex items-center justify-center text-2xl">
          +
        </button>
      </div>
    </div>
  );
}
