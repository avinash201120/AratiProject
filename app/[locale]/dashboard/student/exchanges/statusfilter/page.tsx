export default function Page() {
  return <div>status filter</div>;
}

// const StatusFilter = ({
//   filter,
//   setFilter,
// }: {
//   filter: string;
//   setFilter: (filter: string) => void;
// }) => {
//   return (
//     <div className="flex gap-2 mb-4">
//       <button
//         className={`py-2 px-4 rounded ${
//           filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={() => setFilter("")}
//       >
//         All
//       </button>
//       <button
//         className={`py-2 px-4 rounded ${
//           filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={() => setFilter("pending")}
//       >
//         Pending
//       </button>
//       <button
//         className={`py-2 px-4 rounded ${
//           filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={() => setFilter("completed")}
//       >
//         Completed
//       </button>
//       <button
//         className={`py-2 px-4 rounded ${
//           filter === "in_progress" ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={() => setFilter("in_progress")}
//       >
//         In Progress
//       </button>
//     </div>
//   );
// };

// export default StatusFilter;
