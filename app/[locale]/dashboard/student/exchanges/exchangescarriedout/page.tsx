"use client";

import React, { useState, useEffect } from "react";

interface Proposal {
  id: string; // Unique ID for each proposal
  userId: string;
  offer: string;
  status: "pending" | "accepted" | "rejected" | "completed"; // Include "completed"
  createdAt: string;
  product: string; // Add product name
  exchangeId?: string; // Include exchangeId for API calls
  userName: string; // Add userName to track who submitted the proposal
}

const AcceptedProposalsList = () => {
  const [acceptedProposals, setAcceptedProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedProposals = async () => {
      try {
        const response = await fetch(
          `/api/student/exchanges/proposals/received`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();

        // Filter proposals with status "accepted"
        const filteredProposals = data.filter(
          (proposal: Proposal) => proposal.status === "accepted"
        );
        setAcceptedProposals(filteredProposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedProposals();
  }, []);

  const handleConfirmExchange = async (exchangeId: string | undefined) => {
    if (!exchangeId) {
      alert("Exchange ID is missing for this proposal.");
      return;
    }

    try {
      const response = await fetch(
        `/api/student/exchanges/${exchangeId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm the exchange");
      }

      alert("Exchange marked as completed!");
      // Update the status to "completed" in the UI
      setAcceptedProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.exchangeId === exchangeId
            ? { ...proposal, status: "completed" }
            : proposal
        )
      );
    } catch (error) {
      console.error("Error confirming exchange:", error);
    }
  };

  if (loading) {
    return <p className="mt-4 text-gray-500">Loading accepted proposals...</p>;
  }

  if (acceptedProposals.length === 0) {
    return (
      <p className="mt-4 text-gray-500">No accepted proposals available.</p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Accepted Proposals</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Product</th>
              <th className="border border-gray-300 p-2 text-left">Offer</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">
                Submitted By
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Submitted At
              </th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {acceptedProposals.map((proposal) => (
              <tr key={proposal.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  {proposal.product}
                </td>
                <td className="border border-gray-300 p-2">{proposal.offer}</td>
                <td className="border border-gray-300 p-1 text-center">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium text-white rounded-full ${
                      proposal.status === "completed"
                        ? "bg-green-500"
                        : proposal.status === "accepted"
                        ? "bg-blue-500"
                        : proposal.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </td>

                <td className="border border-gray-300 p-2">
                  {proposal.userName}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(proposal.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      proposal.status === "accepted"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleConfirmExchange(proposal.exchangeId)}
                    disabled={proposal.status === "accepted"}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedProposalsList;
