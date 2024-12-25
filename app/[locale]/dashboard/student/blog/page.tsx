import Image from "next/image";
import React from "react";

const BlogPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Campus Blog</h1>
        <p className="text-gray-600 mt-2">
          Explore the latest updates and stories from our campus
        </p>
      </header>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Post Card */}
        <div className="border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/1.jpg"
            alt="Blog Post 1"
            className="w-full h-48 object-cover rounded-t-lg"
            width={100}
            height={100}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Blog Post 1
            </h2>
            <p className="text-gray-600 mb-4">
              Short description of the blog post...
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read More
            </button>
          </div>
        </div>

        {/* Placeholder for additional blog posts */}
        <div className="border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/2.jpg"
            alt="Blog Post 2"
            className="w-full h-48 object-cover rounded-t-lg"
            width={100}
            height={100}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Blog Post 2
            </h2>
            <p className="text-gray-600 mb-4">
              Short description of the blog post...
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read More
            </button>
          </div>
        </div>

        <div className="border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/3.jpg"
            alt="Blog Post 3"
            className="w-full h-48 object-cover rounded-t-lg"
            width={100}
            height={100}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Blog Post 3
            </h2>
            <p className="text-gray-600 mb-4">
              Short description of the blog post...
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
