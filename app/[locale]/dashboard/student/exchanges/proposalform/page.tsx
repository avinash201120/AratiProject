export default function Page() {
  return <div>proposal form</div>;
}

// "use client";

// import React, { useState } from "react";

// interface Proposal {
//   id: string;
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected"; // Union type
//   createdAt: string;
// }

// interface ProposalFormProps {
//   exchangeId: string; // The ID of the exchange for which the proposal is being made
//   onProposalSubmit: (proposal: Proposal) => void; // Use the Proposal interface
// }

// // interface ProposalFormProps {
// //   exchangeId: string; // The ID of the exchange for which the proposal is being made
// //   onProposalSubmit: (proposal: {
// //     id: string;
// //     userId: string;
// //     offer: string;
// //     status: string;
// //     createdAt: string;
// //   }) => void;
// // }

// const ProposalForm: React.FC<ProposalFormProps> = ({
//   exchangeId,
//   onProposalSubmit,
// }) => {
//   const [offer, setOffer] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `/api/student/exchanges/${exchangeId}/proposals`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ offer }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit proposal");
//       }

//       const newProposal = await response.json();
//       onProposalSubmit(newProposal); // Trigger callback with the new proposal
//       setOffer(""); // Reset form field
//     } catch (err: any) {
//       setError(
//         err.message || "An error occurred while submitting the proposal"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="border p-4 rounded shadow-sm mt-6">
//       <h2 className="text-xl font-semibold mb-4">Submit a Proposal</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="offer"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Offer
//           </label>
//           <textarea
//             id="offer"
//             name="offer"
//             rows={3}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             value={offer}
//             onChange={(e) => setOffer(e.target.value)}
//             required
//             placeholder="Describe your offer"
//           ></textarea>
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Proposal"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProposalForm;

// "use client";

// import React, { useState } from "react";

// interface ProposalFormProps {
//   exchangeId: string; // The ID of the exchange for which the proposal is being made
//   onProposalSubmit: (proposal: { offer: string }) => void; // Callback function after submission
// }

// const ProposalForm: React.FC<ProposalFormProps> = ({
//   exchangeId,
//   onProposalSubmit,
// }) => {
//   const [offer, setOffer] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `/api/student/exchanges/${exchangeId}/proposals`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ offer }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit proposal");
//       }

//       const data = await response.json();
//       onProposalSubmit(data); // Trigger the callback with the submitted proposal
//       setOffer(""); // Clear the form field
//     } catch (err: any) {
//       setError(
//         err.message || "An error occurred while submitting the proposal"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="border p-4 rounded shadow-sm mt-6">
//       <h2 className="text-xl font-semibold mb-4">Submit a Proposal</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="offer"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Offer
//           </label>
//           <textarea
//             id="offer"
//             name="offer"
//             rows={3}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             value={offer}
//             onChange={(e) => setOffer(e.target.value)}
//             required
//             placeholder="Describe your offer (e.g., I will exchange my iPhone 11)"
//           ></textarea>
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Proposal"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProposalForm;
