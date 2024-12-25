import React from "react";

const SalesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Sales</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit New Sale
      </button>
      <div className="mt-6">
        {/* Display sales items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for sales items */}
          <div className="border rounded p-4 shadow-sm">
            <h2 className="font-semibold">Sales Item 1</h2>
            <p>Description of the sales item...</p>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Edit
            </button>
            <button className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
