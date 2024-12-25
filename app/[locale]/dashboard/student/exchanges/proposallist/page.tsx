export default function Page() {
  return <div>proposal list</div>;
}

// "use client";

// import React, { useState } from "react";

// interface Proposal {
//   id: string; // Unique ID for each proposal
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
//   product: string; // Product name
//   exchangeId: string; // Include exchangeId for API calls
// }

// const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
//   const [proposalData, setProposalData] = useState(proposals);

//   const handleStatusChange = async (
//     exchangeId: string,
//     proposalId: string,
//     newStatus: "accepted" | "rejected"
//   ) => {
//     // Optimistically update the proposal status
//     setProposalData((prevProposals) =>
//       prevProposals.map((proposal) =>
//         proposal.id === proposalId
//           ? { ...proposal, status: newStatus }
//           : proposal
//       )
//     );

//     try {
//       const response = await fetch(
//         `/api/student/exchanges/${exchangeId}/proposals/${proposalId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update proposal status");
//       }
//     } catch (error) {
//       console.error("Error updating proposal status:", error);

//       // Revert the status update on failure
//       setProposalData((prevProposals) =>
//         prevProposals.map((proposal) =>
//           proposal.id === proposalId
//             ? { ...proposal, status: "pending" }
//             : proposal
//         )
//       );
//     }
//   };

//   if (!proposalData || proposalData.length === 0) {
//     return <p className="mt-4 text-gray-500">No proposals received.</p>;
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Proposals Received</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left">Product</th>
//               <th className="border border-gray-300 p-2 text-left">Offer</th>
//               <th className="border border-gray-300 p-2 text-left">Status</th>
//               <th className="border border-gray-300 p-2 text-left">
//                 Submitted At
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proposalData.map((proposal) => (
//               <tr key={proposal.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 p-2">
//                   {proposal.product}
//                 </td>
//                 <td className="border border-gray-300 p-2">{proposal.offer}</td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   <span
//                     className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//                       proposal.status === "accepted"
//                         ? "bg-green-500"
//                         : proposal.status === "rejected"
//                         ? "bg-red-500"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {proposal.status}
//                   </span>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(proposal.createdAt).toLocaleString()}
//                 </td>
//                 <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                   {proposal.status === "pending" ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         onClick={() =>
//                           handleStatusChange(
//                             proposal.exchangeId,
//                             proposal.id,
//                             "accepted"
//                           )
//                         }
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         onClick={() =>
//                           handleStatusChange(
//                             proposal.exchangeId,
//                             proposal.id,
//                             "rejected"
//                           )
//                         }
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-green-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProposalList;

// "use client";

// not contain exchangeId
// import React, { useState } from "react";

// interface Proposal {
//   id: string; // Unique ID for each proposal
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
//   product: string; // Add product name
// }

// const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
//   const [proposalData, setProposalData] = useState(proposals);

//   const handleStatusChange = (
//     id: string,
//     newStatus: "accepted" | "rejected"
//   ) => {
//     setProposalData((prevProposals) =>
//       prevProposals.map((proposal) =>
//         proposal.id === id ? { ...proposal, status: newStatus } : proposal
//       )
//     );

//     fetch(`/api/student/exchanges/proposals/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: newStatus }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to update proposal status");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating proposal:", error);
//         setProposalData((prevProposals) =>
//           prevProposals.map((proposal) =>
//             proposal.id === id ? { ...proposal, status: "pending" } : proposal
//           )
//         );
//       });
//   };

//   if (!proposalData || proposalData.length === 0) {
//     return <p className="mt-4 text-gray-500">No proposals received.</p>;
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Proposals Received</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left">Product</th>
//               <th className="border border-gray-300 p-2 text-left">Offer</th>
//               <th className="border border-gray-300 p-2 text-left">Status</th>
//               <th className="border border-gray-300 p-2 text-left">
//                 Submitted At
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proposalData.map((proposal) => (
//               <tr key={proposal.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 p-2">
//                   {proposal.product}
//                 </td>
//                 <td className="border border-gray-300 p-2">{proposal.offer}</td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   <span
//                     className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//                       proposal.status === "accepted"
//                         ? "bg-green-500"
//                         : proposal.status === "rejected"
//                         ? "bg-red-500"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {proposal.status}
//                   </span>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(proposal.createdAt).toLocaleString()}
//                 </td>
//                 <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                   {proposal.status === "pending" ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "accepted")
//                         }
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-green-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProposalList;

// "use client";

// import React, { useState } from "react";

// interface Proposal {
//   id: string; // Unique ID for each proposal
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
//   exchangeId: string; // Add exchange ID to distinguish proposals
// }

// const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
//   const [proposalData, setProposalData] = useState(proposals);

//   const handleStatusChange = (
//     id: string,
//     newStatus: "accepted" | "rejected"
//   ) => {
//     setProposalData((prevProposals) =>
//       prevProposals.map((proposal) =>
//         proposal.id === id ? { ...proposal, status: newStatus } : proposal
//       )
//     );

//     fetch(`/api/student/exchanges/proposals/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: newStatus }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to update proposal status");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating proposal:", error);
//         setProposalData((prevProposals) =>
//           prevProposals.map((proposal) =>
//             proposal.id === id ? { ...proposal, status: "pending" } : proposal
//           )
//         );
//       });
//   };

//   if (!proposalData || proposalData.length === 0) {
//     return <p className="mt-4 text-gray-500">No proposals received.</p>;
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Proposals Received</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left">
//                 Exchange ID
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Offer</th>
//               <th className="border border-gray-300 p-2 text-left">Status</th>
//               <th className="border border-gray-300 p-2 text-left">
//                 Submitted At
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proposalData.map((proposal) => (
//               <tr key={proposal.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 p-2">
//                   {proposal.exchangeId}
//                 </td>
//                 <td className="border border-gray-300 p-2">{proposal.offer}</td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   <span
//                     className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//                       proposal.status === "accepted"
//                         ? "bg-green-500"
//                         : proposal.status === "rejected"
//                         ? "bg-red-500"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {proposal.status}
//                   </span>
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(proposal.createdAt).toLocaleString()}
//                 </td>
//                 <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                   {proposal.status === "pending" ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "accepted")
//                         }
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-green-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProposalList;

// "use client";

// import React, { useState } from "react";

// interface Proposal {
//   id: string; // Added unique ID for each proposal
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

//modified proposallist for proposalreceived page
// const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
//   // Local state to manage proposals
//   const [proposalData, setProposalData] = useState(proposals);

//   // Function to handle status update
//   const handleStatusChange = (
//     id: string,
//     newStatus: "accepted" | "rejected"
//   ) => {
//     // Optimistically update the state
//     setProposalData((prevProposals) =>
//       prevProposals.map((proposal) =>
//         proposal.id === id ? { ...proposal, status: newStatus } : proposal
//       )
//     );

//     // Simulate a server call for updating the proposal
//     // Replace this with an actual API call
//     fetch(`/api/student/exchanges/proposals/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: newStatus }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to update proposal status");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating proposal:", error);
//         // Revert the optimistic update in case of failure
//         setProposalData((prevProposals) =>
//           prevProposals.map((proposal) =>
//             proposal.id === id ? { ...proposal, status: "pending" } : proposal
//           )
//         );
//       });
//   };

//   if (!proposalData || proposalData.length === 0) {
//     return <p className="mt-4 text-gray-500">No proposals available.</p>;
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Proposals</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left">Offer</th>
//               <th className="border border-gray-300 p-2 text-left">Status</th>
//               <th className="border border-gray-300 p-2 text-left">
//                 Submitted At
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proposalData.map((proposal) => (
//               <tr key={proposal.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 p-2">{proposal.offer}</td>

//                 {/* Status displayed as a small rounded button */}
//                 <td className="border border-gray-300 p-2 text-center">
//                   <span
//                     className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
//                       proposal.status === "accepted"
//                         ? "bg-green-500"
//                         : proposal.status === "rejected"
//                         ? "bg-red-500"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {proposal.status}
//                   </span>
//                 </td>

//                 <td className="border border-gray-300 p-2">
//                   {new Date(proposal.createdAt).toLocaleString()}
//                 </td>

//                 <td className="border border-gray-300 p-2 flex justify-center gap-2">
//                   {proposal.status === "pending" ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "accepted")
//                         }
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         onClick={() =>
//                           handleStatusChange(proposal.id, "rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     // Show disabled buttons for accepted proposals
//                     <>
//                       <button
//                         className="bg-green-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-red-300 text-white px-3 py-1 rounded cursor-not-allowed"
//                         disabled
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>

// );
// };

// export default ProposalList;
// <div className="mt-6">
//   <h2 className="text-xl font-semibold mb-4">Proposals</h2>
//   <div className="overflow-x-auto">
//     <table className="table-auto w-full border-collapse border border-gray-300">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="border border-gray-300 p-2 text-left">Offer</th>
//           <th className="border border-gray-300 p-2 text-left">Status</th>
//           <th className="border border-gray-300 p-2 text-left">
//             Submitted At
//           </th>
//           <th className="border border-gray-300 p-2 text-left">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {proposalData.map((proposal) => (
//           <tr key={proposal.id} className="hover:bg-gray-50">
//             <td className="border border-gray-300 p-2">{proposal.offer}</td>

//             <td
//               className={`border border-gray-300 text-sm  p-2 text-center text-white rounded-full ${
//                 proposal.status === "accepted"
//                   ? "bg-green-500"
//                   : proposal.status === "rejected"
//                   ? "bg-red-500"
//                   : "bg-yellow-500"
//               }`}
//             >
//               {proposal.status}
//             </td>
//             <td className="border border-gray-300 p-2">
//               {new Date(proposal.createdAt).toLocaleString()}
//             </td>
//             <td className="border border-gray-300 p-2 flex gap-2">
//               {proposal.status === "pending" && (
//                 <>
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                     onClick={() =>
//                       handleStatusChange(proposal.id, "accepted")
//                     }
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() =>
//                       handleStatusChange(proposal.id, "rejected")
//                     }
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

// import React from "react";

// interface Proposal {
//   userId: string;
//   offer: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

// const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
//   if (!proposals || proposals.length === 0) {
//     return <p className="mt-4 text-gray-500">No proposals available.</p>;
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-2">Proposals</h2>
//       <ul>
//         {proposals.map((proposal, index) => (
//           <li key={index} className="border p-4 rounded mb-2">
//             <p className="font-bold">Offer: {proposal.offer}</p>
//             <p>Status: {proposal.status}</p>
//             <p className="text-sm text-gray-500">
//               Submitted At: {new Date(proposal.createdAt).toLocaleString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProposalList;
