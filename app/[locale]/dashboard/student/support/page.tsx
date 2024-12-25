import React from "react";

const SupportPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit a Ticket
      </button>
      <div className="mt-6">
        {/* Display support tickets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for tickets */}
          <div className="border rounded p-4 shadow-sm">
            <h2 className="font-semibold">Ticket: Account Issue</h2>
            <p>Status: Open</p>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
