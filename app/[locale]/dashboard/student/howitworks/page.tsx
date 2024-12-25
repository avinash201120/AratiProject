import React from "react";

const SwapyCampusPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          How Does It Work?
        </h1>
        <p className="text-gray-600 mt-4">
          SwapyCampus is an exchange reserved exclusively for students. Our
          mission is to help students finance their needs by exchanging their
          services and surplus in a secure campus swap.
        </p>
      </header>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto">
        {/* Instructions */}
        <div className="mb-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Get Started?
          </h2>
          <p className="text-gray-600">
            Simply click on{" "}
            <span className="text-blue-500 font-semibold">Submit an offer</span>{" "}
            and fill out the form in as much detail as possible. It&apos;s free!
          </p>
        </div>

        {/* Examples Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Here are some examples to illustrate the concept:
          </h2>

          {/* Example 1 */}
          <div className="mb-6 bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-600">Example 1</h3>
            <p className="text-gray-600 mt-2">
              <strong>Exchange a service for a service:</strong> Lola offers on
              the platform 4 hours of chemistry tutoring. In return, she needs
              someone to help her move out of her Kot.
            </p>
          </div>

          {/* Example 2 */}
          <div className="mb-6 bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-600">Example 2</h3>
            <p className="text-gray-600 mt-2">
              <strong>Exchange a service for a product:</strong> Frédérique
              offers on the platform one afternoon (4 hours) per week during the
              month of May 2023, to clean and cook. In return, she needs a PC.
            </p>
          </div>

          {/* Example 3 */}
          <div className="mb-6 bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-600">Example 3</h3>
            <p className="text-gray-600 mt-2">
              <strong>Exchange a product for a service:</strong> Julien offers a
              bed, a desk with chair, and a wardrobe that he estimates to be
              worth €250. In return, he needs accommodation in Mons in July
              2023.
            </p>
          </div>

          {/* Example 4 */}
          <div className="mb-6 bg-white shadow-md rounded-lg p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600">Example 4</h3>
            <p className="text-gray-600 mt-2">
              <strong>Exchange a product for a product:</strong> Emilie offers a
              leather jacket that she estimates to be worth €80. In return, she
              needs a microwave for her student accommodation.
            </p>
          </div>
        </div>

        {/* Final Instructions */}
        <div className="bg-blue-50 p-4 rounded-md shadow-md text-center">
          <p className="text-blue-600 font-semibold">
            For the 4 examples, simply click on{" "}
            <span className="text-blue-800">Submit an offer</span> and fill out
            the form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapyCampusPage;
