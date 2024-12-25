"use client";

import UserTable from "@/app/components/admin/UserTable";

// import { UserTable } from "@/app/components/admin/UserTable";

export default function UserManagementPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserTable />
    </div>
  );
}

// import Table from "@/app/components/Table";

// export default function Page() {
//   return (
//     <div>
//       {/* <Table /> */}
//     </div>
//   );
// }
