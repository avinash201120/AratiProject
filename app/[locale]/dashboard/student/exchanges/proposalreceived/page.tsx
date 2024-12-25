export default function Page() {
  return <div>proposal received</div>;
}

// error
// Type error: Page "app/[locale]/dashboard/student/exchanges/proposallist/page.tsx" has an invalid "default" export:
//   Type "{ proposals: Proposal[]; }" is not valid.

// ChatGPT said:
// ChatGPT
// The error indicates that the default export in app/[locale]/dashboard/student/exchanges/proposallist/page.tsx does not meet Next.js's requirements for a valid page component. In Next.js, a page must export a React component, but the current default export seems to be expecting props ({ proposals: Proposal[]; }), which is not how Next.js page components work.

// Fix the Issue
// To resolve this, you need to ensure that:

// ProposalList Component is Not Exported as a Page
// The ProposalList component should not be the default export of the page.tsx file if it requires props like proposals. Instead, it should be a child component that receives props from a parent page or is used elsewhere.

// Fetch the Proposals Inside the Page Component
// Use the useEffect hook or server-side data fetching (getServerSideProps or getStaticProps depending on your needs) to fetch the proposals inside the page.tsx file.

// Solution: Refactor the page.tsx
// Here's an example of how you can structure page.tsx to avoid the error:

// Updated page.tsx
// tsx
// Copy code
// "use client";

// import React, { useEffect, useState } from "react";
// import ProposalList from "../proposallist/component"; // Move ProposalList to a "component" file

// const ProposalsPage = () => {
//   const [proposals, setProposals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const response = await fetch(`/api/student/exchanges/proposals/received`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch proposals");
//         }
//         const data = await response.json();
//         setProposals(data);
//       } catch (error) {
//         console.error("Error fetching proposals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProposals();
//   }, []);

//   if (loading) {
//     return <p>Loading proposals...</p>;
//   }

//   return (
//     <div className="p-6">
//       <ProposalList proposals={proposals} />
//     </div>
//   );
// };

// export default ProposalsPage;
// ProposalList Component
// If ProposalList needs to remain reusable and accept proposals as a prop, it should not be the default export of a page.tsx file. Move it to a separate file, such as component.tsx.

// tsx
// Copy code
// interface Proposal {
//   id: string; // Replace with actual properties
//   title: string;
//   description: string;
// }

// interface ProposalListProps {
//   proposals: Proposal[];
// }

// const ProposalList: React.FC<ProposalListProps> = ({ proposals }) => {
//   return (
//     <div>
//       <h2>Received Proposals</h2>
//       {proposals.length > 0 ? (
//         <ul>
//           {proposals.map((proposal) => (
//             <li key={proposal.id}>
//               <h3>{proposal.title}</h3>
//               <p>{proposal.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No proposals received.</p>
//       )}
//     </div>
//   );
// };

// export default ProposalList;
// Explanation
// Separation of Concerns:

// ProposalsPage fetches data and manages state.
// ProposalList is a reusable component that renders the proposals.
// Next.js Page Requirements:

// Pages must not expect props like { proposals: Proposal[]; } from the parent route. Instead, fetch the data within the page.
// Reusable Components:

// By moving ProposalList to a separate file, it can be reused in other contexts.
// With this structure, the error should be resolved. Ensure that all page components adhere to Next.js requirements by exporting only a React component without expecting props.

// "use client";

// import React, { useEffect, useState } from "react";
// import ProposalList from "../proposallist/page";

// const ProposalReceived = () => {
//   const [proposals, setProposals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const response = await fetch(
//           `/api/student/exchanges/proposals/received`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch proposals");
//         }
//         const data = await response.json();
//         setProposals(data);
//       } catch (error) {
//         console.error("Error fetching proposals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProposals();
//   }, []);

//   if (loading) {
//     return <p>Loading proposals...</p>;
//   }

//   return (
//     <div className="p-6">
//       <ProposalList proposals={proposals} />
//     </div>
//   );
// };

// export default ProposalReceived;
