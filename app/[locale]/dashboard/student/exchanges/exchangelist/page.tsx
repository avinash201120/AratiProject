export default function Page() {
  return <div>exchange Lsit</div>;
}

//for deployemnt commented
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// const ExchangeList = ({
//   exchanges: initialExchanges,
// }: {
//   exchanges: any[];
// }) => {
//   const [exchanges, setExchanges] = useState(initialExchanges);

//   const handleDelete = async (exchangeId: string) => {
//     const confirmed = confirm("Are you sure you want to delete this exchange?");
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Exchange deleted successfully!");

//         // Update the state to remove the deleted exchange
//         setExchanges((prevExchanges) =>
//           prevExchanges.filter((exchange) => exchange.id !== exchangeId)
//         );
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Failed to delete the exchange: ${errorData.error || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting exchange:", error);
//       alert("An error occurred while trying to delete the exchange.");
//     }
//   };

//   const handleModify = (exchangeId: string) => {
//     window.location.href = `/dashboard/student/exchanges/${exchangeId}/edit`;
//   };

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 p-2 text-left">Product</th>
//             <th className="border border-gray-300 p-2 text-left">
//               Description
//             </th>
//             <th className="border border-gray-300 p-2 text-left">
//               Exchange For
//             </th>
//             <th className="border border-gray-300 p-2 text-left">Type</th>
//             <th className="border border-gray-300 p-2 text-left">TradeType</th>
//             <th className="border border-gray-300 p-2 text-left">Status</th>
//             <th className="border border-gray-300 p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exchanges.map((exchange) => (
//             <tr key={exchange.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 p-2">{exchange.product}</td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.description}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.exchangeFor || "N/A"}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.type || "N/A"}
//               </td>
//               <td>{exchange.tradeDetails.tradeType}</td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <span
//                   className={`px-4 py-2 text-sm font-medium text-white rounded-full ${
//                     exchange.status === "completed"
//                       ? "bg-green-500"
//                       : exchange.status === "in_progress"
//                       ? "bg-blue-500"
//                       : "bg-yellow-500"
//                   }`}
//                 >
//                   {exchange.status}
//                 </span>
//               </td>

//               <td className="border border-gray-300 p-2 flex space-x-2">
//                 {/* View Button */}
//                 <Link href={`/dashboard/student/exchanges/${exchange.id}`}>
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     View
//                   </button>
//                 </Link>

//                 {/* Modify Button */}
//                 <Link href={`/dashboard/student/exchanges/${exchange.id}/edit`}>
//                   <button
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                     onClick={() => handleModify(exchange.id)}
//                   >
//                     Modify
//                   </button>
//                 </Link>

//                 {/* Delete Button */}
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => handleDelete(exchange.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExchangeList;

//before my exchange model
// import React, { useState } from "react";
// import Link from "next/link";

// const ExchangeList = ({
//   exchanges: initialExchanges,
// }: {
//   exchanges: any[];
// }) => {
//   const [exchanges, setExchanges] = useState(initialExchanges);

//   const handleDelete = async (exchangeId: string) => {
//     const confirmed = confirm("Are you sure you want to delete this exchange?");
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`/api/student/exchanges/${exchangeId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         alert("Exchange deleted successfully!");

//         // Update the state to remove the deleted exchange
//         setExchanges((prevExchanges) =>
//           prevExchanges.filter((exchange) => exchange.id !== exchangeId)
//         );
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Failed to delete the exchange: ${errorData.error || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting exchange:", error);
//       alert("An error occurred while trying to delete the exchange.");
//     }
//   };

//   const handleModify = (exchangeId: string) => {
//     // Redirect or open a form/modal for modification
//     console.log("Modify clicked for Exchange ID:", exchangeId);
//     window.location.href = `/dashboard/student/exchanges/${exchangeId}/edit`; // Redirect to an edit page
//   };

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 p-2 text-left">Product</th>
//             <th className="border border-gray-300 p-2 text-left">
//               Description
//             </th>
//             <th className="border border-gray-300 p-2 text-left">
//               Exchange For
//             </th>
//             <th className="border border-gray-300 p-2 text-left">Status</th>
//             <th className="border border-gray-300 p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exchanges.map((exchange) => (
//             <tr key={exchange.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 p-2">{exchange.product}</td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.description}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.exchangeFor}
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <span
//                   className={`px-4 py-2 text-sm font-medium text-white rounded-full ${
//                     exchange.status === "completed"
//                       ? "bg-green-500"
//                       : exchange.status === "in_progress"
//                       ? "bg-blue-500"
//                       : "bg-yellow-500"
//                   }`}
//                 >
//                   {exchange.status}
//                 </span>
//               </td>
//               <td className="border border-gray-300 p-2 flex space-x-2">
//                 {/* View Button */}
//                 <Link href={`/dashboard/student/exchanges/${exchange.id}`}>
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     View
//                   </button>
//                 </Link>

//                 {/* Modify Button */}
//                 <Link href={`/dashboard/student/exchanges/${exchange.id}/edit`}>
//                   <button
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                     onClick={() => handleModify(exchange.id)}
//                   >
//                     Modify
//                   </button>
//                 </Link>

//                 {/* Delete Button */}
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => handleDelete(exchange.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExchangeList;

// import React from "react";
// import Link from "next/link";

// const ExchangeList = ({ exchanges }: { exchanges: any[] }) => {
//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 p-2 text-left">Product</th>
//             <th className="border border-gray-300 p-2 text-left">
//               Description
//             </th>
//             <th className="border border-gray-300 p-2 text-left">
//               Exchange For
//             </th>
//             <th className="border border-gray-300 p-2 text-left">Status</th>
//             <th className="border border-gray-300 p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exchanges.map((exchange) => (
//             <tr key={exchange.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 p-2">{exchange.product}</td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.description}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {exchange.exchangeFor}
//               </td>
//               {/* <td
//                 className={`border border-gray-300 p-2 ${
//                   exchange.status === "completed"
//                     ? "text-green-500"
//                     : exchange.status === "in_progress"
//                     ? "text-blue-500"
//                     : "text-yellow-500"
//                 }`}
//               >
//                 {exchange.status}
//               </td> */}
//               <td className="border border-gray-300 p-2 text-center">
//                 <span
//                   className={`px-4 py-2 text-sm font-medium text-white rounded-full ${
//                     exchange.status === "completed"
//                       ? "bg-green-500"
//                       : exchange.status === "in_progress"
//                       ? "bg-red-500"
//                       : "bg-yellow-500"
//                   }`}
//                 >
//                   {exchange.status}
//                 </span>
//               </td>
//               <td className="border border-gray-300 p-2">
//                 <Link href={`/dashboard/student/exchanges/${exchange.id}`}>
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     View
//                   </button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// <div className="mt-4">
//   <h2 className="text-xl font-semibold">Exchanges</h2>
//   <ul>
//     {exchanges.map((exchange) => (
//       <li key={exchange.id} className="border p-4 mb-2 rounded">
//         <h3 className="font-bold">{exchange.product}</h3>
//         <p>{exchange.description}</p>
//         <p className="text-sm text-gray-500">
//           Exchange For: {exchange.exchangeFor}
//         </p>
//         <p
//           className={`text-sm ${
//             exchange.status === "completed"
//               ? "text-green-500"
//               : "text-yellow-500"
//           }`}
//         >
//           Status: {exchange.status}
//         </p>
//         <Link href={`/dashboard/student/exchanges/${exchange.id}`}>
//           <span className="text-blue-500 hover:underline">
//             View Details
//           </span>
//         </Link>
//       </li>
//     ))}
//   </ul>
// </div>

// export default ExchangeList;
