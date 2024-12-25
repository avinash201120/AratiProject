"use client";
export default function Page() {
  return <div>student dashboard home</div>;
}

// import React, { useState, useEffect } from "react";
// import StatusFilter from "./statusfilter/page";
// import CreateExchange from "./createexchange/page";
// import ExchangeList from "./exchangelist/page";

// const MyExchanges = () => {
//   const [exchanges, setExchanges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [filter, setFilter] = useState("all");
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     const fetchMyExchanges = async () => {
//       try {
//         const response = await fetch("/api/student/exchanges?myExchanges=true");
//         const data = await response.json();
//         setExchanges(data);
//       } catch (error) {
//         console.error("Failed to fetch exchanges:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyExchanges();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // useEffect(() => {
//   //   const fetchExchanges = async () => {
//   //     const response = await fetch(`/api/student/exchanges?status=${filter}`);
//   //     // const response = await fetch(`/api/student/exchanges`);
//   //     const data = await response.json();
//   //     setExchanges(data);
//   //   };

//   //   fetchExchanges();
//   // }, [filter]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Exchanges</h1>
//       <StatusFilter filter={filter} setFilter={setFilter} />
//       <CreateExchange />
//       <ExchangeList exchanges={exchanges} />
//     </div>
//   );
// };

// export default MyExchanges;

// import React from "react";

// const ExchangesPage = () => {
//   return (
//     // <div className="p-6">
//     <>
//       <h1 className="text-2xl font-bold mb-4">My Exchanges</h1>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Submit New Exchange
//       </button>
//       <div className="mt-6">
//         {/* Display exchange offers */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Placeholder for exchange items */}
//           <div className="border rounded p-4 shadow-sm">
//             <h2 className="font-semibold">Exchange Item 1</h2>
//             <p>Description of the exchange item...</p>
//             <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               Edit
//             </button>
//             <button className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//     // </div>
//   );
// };

// export default ExchangesPage;
