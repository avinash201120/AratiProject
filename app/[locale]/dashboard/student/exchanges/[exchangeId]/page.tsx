"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Proposal {
  id: string;
  userId: string;
  offer: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface Exchange {
  id: string;
  userId: string;
  product: string;
  description: string;
  exchangeFor: string;
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
  proposals: Proposal[];
  createdAt: string;
  updatedAt: string;
}

const ExchangeDetails = () => {
  const { exchangeId } = useParams();
  const [exchange, setExchange] = useState<Exchange | null>(null);

  useEffect(() => {
    const fetchExchange = async () => {
      const response = await fetch(`/api/student/exchanges/${exchangeId}`);
      const data = await response.json();
      setExchange(data);
    };

    fetchExchange();
  }, [exchangeId]);

  if (!exchange) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {exchange.product}
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Field</th>
              <th className="border border-gray-300 p-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Description
              </td>
              <td className="border border-gray-300 p-2">
                {exchange.description}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Exchange For
              </td>
              <td className="border border-gray-300 p-2">
                {exchange.exchangeFor}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Status</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-4 py-1 text-sm font-medium text-white rounded-full ${
                    exchange.status === "completed"
                      ? "bg-green-500"
                      : exchange.status === "in_progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {exchange.status}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Created At
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(exchange.createdAt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">
                Last Updated
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(exchange.updatedAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeDetails;
