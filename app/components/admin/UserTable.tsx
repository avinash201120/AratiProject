"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { PlusIcon } from "./PlusIcon";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

type StatusColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

const statusColorMap: Record<string, StatusColor> = {
  active: "success",
  paused: "warning",
  pending: "danger",
};

// const statusColorMap: Record<string, string> = {
//   active: "success",
//   paused: "warning",
//   pending: "danger",
// };

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Pending", uid: "pending" },
];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]); // State for fetched users
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<SharedSelection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      console.log("Fetched Users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Current Users State:", users);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const filteredUsers = React.useMemo(() => {
    console.log("Original Users Array:", users);

    // Filter out invalid users
    const validUsers = users.filter((user) => user && user.status);
    console.log("Valid Users:", validUsers);

    let filteredUsers = [...validUsers];

    // Apply search filter
    if (filterValue) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email?.toLowerCase().includes(filterValue.toLowerCase())
      );
      console.log("After Search Filter:", filteredUsers);
    }

    // Apply status filter
    if (statusFilter !== "all" && Array.from(statusFilter).length > 0) {
      filteredUsers = filteredUsers.filter((user) => {
        const matches = Array.from(statusFilter)
          .map((s) => String(s).toLowerCase())
          .includes(user.status.toLowerCase());
        console.log(
          `User: ${user.name}, Status: ${user.status}, Matches: ${matches}`
        );
        return matches;
      });
      console.log("After Status Filter:", filteredUsers);
    }

    console.log("Final Filtered Users:", filteredUsers);
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const renderCell = (user: User, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="font-bold">{user.name}</p>;
      case "email":
        return <p className="text-sm text-gray-500">{user.email}</p>;
      case "role":
        return user.role;
      case "status":
        return (
          // <Chip
          //   color={statusColorMap[user.status].toString() || "default"}
          //   size="sm"
          // >
          //   {user.status}
          // </Chip>
          // <Chip
          //   color={
          //     statusColorMap[user.status as keyof typeof statusColorMap] ||
          //     "default"
          //   }
          //   size="sm"
          // >
          //   {user.status}
          // </Chip>

          <Chip
            color={
              statusColorMap[user.status as keyof typeof statusColorMap] ||
              "default"
            }
            size="sm"
            className={`rounded-lg px-4 py-3 text-white ${
              statusColorMap[user.status as keyof typeof statusColorMap] ===
              "success"
                ? "bg-green-500"
                : statusColorMap[user.status as keyof typeof statusColorMap] ===
                  "warning"
                ? "bg-yellow-500"
                : statusColorMap[user.status as keyof typeof statusColorMap] ===
                  "danger"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            {user.status}
          </Chip>

          // <Chip color="primary" size="sm">
          //   {user.status}
          // </Chip>
        );
      case "createdAt":
        return new Date(user.createdAt).toLocaleDateString();
      case "assignrole":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {["student", "citizen", "merchant", "trader"].map((role) => (
                <DropdownItem
                  key={role}
                  onClick={() => handleRoleChange(user.id, role)}
                >
                  Assign as {role}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            {user.status !== "active" && (
              <Button
                size="sm"
                color="success"
                onClick={() => handleStatusChange(user.id, "active")}
              >
                Activate
              </Button>
            )}
            {user.status === "active" && (
              <Button
                size="sm"
                color="warning"
                onClick={() => handleStatusChange(user.id, "inactive")}
              >
                Deactivate
              </Button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const topContent = (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(value) => setFilterValue(value)}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={(keys) =>
                setStatusFilter(keys as SharedSelection)
              }
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredUsers.length} users
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="ml-2"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {paginatedUsers.length > 0
          ? `${paginatedUsers.length} users displayed`
          : "No users to display"}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={totalPages}
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {topContent}
      <Table aria-label="User Management Table" width="100%">
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="createdAt">Created At</TableColumn>
          <TableColumn key="assignrole">Assign Role</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={paginatedUsers}>
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>{renderCell(user, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {bottomContent}
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Pagination,
//   Chip,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   SharedSelection,
// } from "@nextui-org/react";
// import { SearchIcon } from "./SearchIcon";
// import { VerticalDotsIcon } from "./VerticalDotsIcon";
// import { ChevronDownIcon } from "./ChevronDownIcon";
// import { PlusIcon } from "./PlusIcon";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   createdAt: string;
// }

// const statusColorMap: Record<string, string> = {
//   active: "success",
//   paused: "warning",
//   pending: "danger",
// };

// const statusOptions = [
//   { name: "Active", uid: "active" },
//   { name: "Paused", uid: "paused" },
//   { name: "Pending", uid: "pending" },
// ];

// export default function UserTable() {
//   const [users, setUsers] = useState<User[]>([]); // State for fetched users
//   const [filterValue, setFilterValue] = useState("");
//   //   const [statusFilter, setStatusFilter] = useState(new Set<string>("all"));

//   const [statusFilter, setStatusFilter] = useState<SharedSelection>("all");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/admin/users");
//       const data = await response.json();
//       console.log("Fetched Users:", data);
//       setUsers(data);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("Current Users State:", users);

//   const handleStatusChange = async (userId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update user status");
//       }
//       await fetchUsers();
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   const handleRoleChange = async (userId: string, newRole: string) => {
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: newRole }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update user role");
//       }
//       await fetchUsers();
//     } catch (error) {
//       console.error("Failed to update role:", error);
//     }
//   };

//   const filteredUsers = React.useMemo(() => {
//     console.log("Original Users Array:", users);

//     // Filter out invalid users
//     const validUsers = users.filter((user) => user && user.status);
//     console.log("Valid Users:", validUsers);

//     let filteredUsers = [...validUsers];

//     // Apply search filter
//     if (filterValue) {
//       filteredUsers = filteredUsers.filter(
//         (user) =>
//           user.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
//           user.email?.toLowerCase().includes(filterValue.toLowerCase())
//       );
//       console.log("After Search Filter:", filteredUsers);
//     }

//     // Apply status filter
//     if (statusFilter !== "all" && Array.from(statusFilter).size > 0) {
//       filteredUsers = filteredUsers.filter((user) => {
//         const matches = Array.from(statusFilter)
//           .map((s) => s.toLowerCase())
//           .includes(user.status.toLowerCase());
//         console.log(
//           `User: ${user.name}, Status: ${user.status}, Matches: ${matches}`
//         );
//         return matches;
//       });
//       console.log("After Status Filter:", filteredUsers);
//     }

//     console.log("Final Filtered Users:", filteredUsers);
//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const renderCell = (user: User, columnKey: React.Key) => {
//     switch (columnKey) {
//       case "name":
//         return <p className="font-bold">{user.name}</p>;
//       case "email":
//         return <p className="text-sm text-gray-500">{user.email}</p>;
//       case "role":
//         return user.role;
//       case "status":
//         return (
//           <Chip color={statusColorMap[user.status] || "default"} size="sm">
//             {user.status}
//           </Chip>
//         );
//       case "createdAt":
//         return new Date(user.createdAt).toLocaleDateString();
//       case "assignrole":
//         return (
//           <Dropdown>
//             <DropdownTrigger>
//               <Button isIconOnly size="sm" variant="light">
//                 <VerticalDotsIcon className="text-default-300" />
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu>
//               {["student", "citizen", "merchant", "trader"].map((role) => (
//                 <DropdownItem
//                   key={role}
//                   onClick={() => handleRoleChange(user.id, role)}
//                 >
//                   Assign as {role}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         );
//       case "actions":
//         return (
//           <div className="flex gap-2">
//             {user.status !== "active" && (
//               <Button
//                 size="sm"
//                 color="success"
//                 onClick={() => handleStatusChange(user.id, "active")}
//               >
//                 Activate
//               </Button>
//             )}
//             {user.status === "active" && (
//               <Button
//                 size="sm"
//                 color="warning"
//                 onClick={() => handleStatusChange(user.id, "inactive")}
//               >
//                 Deactivate
//               </Button>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const topContent = (
//     <div className="flex flex-col gap-4 mb-4">
//       <div className="flex justify-between gap-3 items-end">
//         <Input
//           isClearable
//           className="w-full sm:max-w-[44%]"
//           placeholder="Search by name..."
//           startContent={<SearchIcon />}
//           value={filterValue}
//           onClear={() => setFilterValue("")}
//           onValueChange={(value) => setFilterValue(value)}
//         />
//         <div className="flex gap-3">
//           <Dropdown>
//             <DropdownTrigger className="hidden sm:flex">
//               <Button
//                 endContent={<ChevronDownIcon className="text-small" />}
//                 variant="flat"
//               >
//                 Status
//               </Button>
//             </DropdownTrigger>
//             {/* <DropdownMenu

//               disallowEmptySelection
//               closeOnSelect={false}
//               selectedKeys={statusFilter}
//               selectionMode="multiple"
//               onSelectionChange={setStatusFilter}
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid} className="capitalize">
//                   {status.name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu> */}
//             <DropdownMenu
//               disallowEmptySelection
//               closeOnSelect={false}
//               selectedKeys={statusFilter}
//               selectionMode="multiple"
//               onSelectionChange={(keys) =>
//                 setStatusFilter(keys as SharedSelection)
//               }
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid} className="capitalize">
//                   {status.name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//           <Button color="primary" endContent={<PlusIcon />}>
//             Add New
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-default-400 text-small">
//           Total {filteredUsers.length} users
//         </span>
//         <label className="flex items-center text-default-400 text-small">
//           Rows per page:
//           <select
//             className="ml-2"
//             value={rowsPerPage}
//             onChange={(e) => setRowsPerPage(Number(e.target.value))}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );

//   const bottomContent = (
//     <div className="py-2 px-2 flex justify-between items-center">
//       <span className="w-[30%] text-small text-default-400">
//         {paginatedUsers.length > 0
//           ? `${paginatedUsers.length} users displayed`
//           : "No users to display"}
//       </span>
//       <Pagination
//         isCompact
//         showControls
//         showShadow
//         color="primary"
//         page={page}
//         total={totalPages}
//         onChange={(newPage) => setPage(newPage)}
//       />
//     </div>
//   );

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {topContent}
//       <Table
//         aria-label="User Management Table"
//         pagination
//         css={{ minWidth: "100%" }}
//       >
//         <TableHeader>
//           <TableColumn key="name">Name</TableColumn>
//           <TableColumn key="email">Email</TableColumn>
//           <TableColumn key="role">Role</TableColumn>
//           <TableColumn key="status">Status</TableColumn>
//           <TableColumn key="createdAt">Created At</TableColumn>
//           <TableColumn key="assignrole">Assign Role</TableColumn>
//           <TableColumn key="actions">Actions</TableColumn>
//         </TableHeader>
//         <TableBody items={paginatedUsers}>
//           {(user) => (
//             <TableRow key={user.id}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(user, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       {/* <Pagination
//          total={totalPages}
//          page={page}
//          onChange={(newPage) => setPage(newPage)}
//          className="mt-4"
//        /> */}
//       {bottomContent}
//     </div>
//   );
// }

//************************ */

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Pagination,
//   Chip,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";
// import { SearchIcon } from "./SearchIcon";
// import { VerticalDotsIcon } from "./VerticalDotsIcon";
// import { ChevronDownIcon } from "./ChevronDownIcon";
// import { PlusIcon } from "./PlusIcon";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   createdAt: string;
// }

// const statusColorMap: Record<string, string> = {
//   active: "success",
//   paused: "warning",
//   pending: "danger",
// };

// const statusOptions = [
//   { name: "Active", uid: "active" },
//   { name: "Paused", uid: "paused" },
//   { name: "Pending", uid: "pending" },
// ];

// export default function UserTable() {

//   const [users, setUsers] = useState<User[]>([]); // State for fetched users
//   const [filterValue, setFilterValue] = useState("");
//   const [statusFilter, setStatusFilter] = useState(new Set<string>("all"));
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/admin/users");
//       const data = await response.json();
//       console.log("Fetched Users:", data);
//       setUsers(data);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("Current Users State:", users);

//   const handleStatusChange = async (userId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update user status");
//       }
//       await fetchUsers();
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   const handleRoleChange = async (userId: string, newRole: string) => {
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: newRole }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update user role");
//       }
//       await fetchUsers();
//     } catch (error) {
//       console.error("Failed to update role:", error);
//     }
//   };

//   const filteredUsers = React.useMemo(() => {
//     console.log("Original Users Array:", users);

//     // Filter out invalid users
//     const validUsers = users.filter((user) => user && user.status);
//     console.log("Valid Users:", validUsers);

//     let filteredUsers = [...validUsers];

//     // Apply search filter
//     if (filterValue) {
//       filteredUsers = filteredUsers.filter(
//         (user) =>
//           user.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
//           user.email?.toLowerCase().includes(filterValue.toLowerCase())
//       );
//       console.log("After Search Filter:", filteredUsers);
//     }

//     // Apply status filter
//     if (statusFilter !== "all" && Array.from(statusFilter).size > 0) {
//       filteredUsers = filteredUsers.filter((user) => {
//         const matches = Array.from(statusFilter)
//           .map((s) => s.toLowerCase())
//           .includes(user.status.toLowerCase());
//         console.log(
//           `User: ${user.name}, Status: ${user.status}, Matches: ${matches}`
//         );
//         return matches;
//       });
//       console.log("After Status Filter:", filteredUsers);
//     }

//     console.log("Final Filtered Users:", filteredUsers);
//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const renderCell = (user: User, columnKey: React.Key) => {
//     switch (columnKey) {
//       case "name":
//         return <p className="font-bold">{user.name}</p>;
//       case "email":
//         return <p className="text-sm text-gray-500">{user.email}</p>;
//       case "role":
//         return user.role;
//       case "status":
//         return (
//           <Chip color={statusColorMap[user.status] || "default"} size="sm">
//             {user.status}
//           </Chip>
//         );
//       case "createdAt":
//         return new Date(user.createdAt).toLocaleDateString();
//       case "assignrole":
//         return (
//           <Dropdown>
//             <DropdownTrigger>
//               <Button isIconOnly size="sm" variant="light">
//                 <VerticalDotsIcon className="text-default-300" />
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu>
//               {["student", "citizen", "merchant", "trader"].map((role) => (
//                 <DropdownItem
//                   key={role}
//                   onClick={() => handleRoleChange(user.id, role)}
//                 >
//                   Assign as {role}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         );
//       case "actions":
//         return (
//           <div className="flex gap-2">
//             {user.status !== "active" && (
//               <Button
//                 size="sm"
//                 color="success"
//                 onClick={() => handleStatusChange(user.id, "active")}
//               >
//                 Activate
//               </Button>
//             )}
//             {user.status === "active" && (
//               <Button
//                 size="sm"
//                 color="warning"
//                 onClick={() => handleStatusChange(user.id, "inactive")}
//               >
//                 Deactivate
//               </Button>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const topContent = (
//     <div className="flex flex-col gap-4 mb-4">
//       <div className="flex justify-between gap-3 items-end">
//         <Input
//           isClearable
//           className="w-full sm:max-w-[44%]"
//           placeholder="Search by name..."
//           startContent={<SearchIcon />}
//           value={filterValue}
//           onClear={() => setFilterValue("")}
//           onValueChange={(value) => setFilterValue(value)}
//         />
//         <div className="flex gap-3">
//           <Dropdown>
//             <DropdownTrigger className="hidden sm:flex">
//               <Button
//                 endContent={<ChevronDownIcon className="text-small" />}
//                 variant="flat"
//               >
//                 Status
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               disallowEmptySelection
//               closeOnSelect={false}
//               selectedKeys={statusFilter}
//               selectionMode="multiple"
//               onSelectionChange={setStatusFilter}
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid} className="capitalize">
//                   {status.name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//           <Button color="primary" endContent={<PlusIcon />}>
//             Add New
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-default-400 text-small">
//           Total {filteredUsers.length} users
//         </span>
//         <label className="flex items-center text-default-400 text-small">
//           Rows per page:
//           <select
//             className="ml-2"
//             value={rowsPerPage}
//             onChange={(e) => setRowsPerPage(Number(e.target.value))}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );

//   //    const bottomContent = React.useMemo(() => {
//   //      return (
//   //        <div className="py-2 px-2 flex justify-between items-center">
//   //          <span className="w-[30%] text-small text-default-400">
//   //            {filteredUsers.length} users
//   //          </span>
//   //          <Pagination
//   //            isCompact
//   //            showControls
//   //            showShadow
//   //            color="primary"
//   //            page={page}
//   //            total={totalPages}
//   //            onChange={setPage}
//   //          />
//   //        </div>
//   //      );
//   //    }, [page, totalPages, filteredUsers.length]);
// //   const bottomContent = React.useMemo(() => {
// //     return (
// //       <div className="py-2 px-2 flex justify-between items-center">
// //         <span className="w-[30%] text-small text-default-400">
// //           {selectedKeys === "all"
// //             ? "All items selected"
// //             : `${selectedKeys.size} of ${filteredItems.length} selected`}
// //         </span>
// //         <Pagination
// //           isCompact
// //           showControls
// //           showShadow
// //           color="primary"
// //           page={page}
// //           total={pages}
// //           onChange={setPage}
// //         />
// //         <div className="hidden sm:flex w-[30%] justify-end gap-2">
// //           <Button
// //             isDisabled={pages === 1}
// //             size="sm"
// //             variant="flat"
// //             onPress={onPreviousPage}
// //           >
// //             Previous
// //           </Button>
// //           <Button
// //             isDisabled={pages === 1}
// //             size="sm"
// //             variant="flat"
// //             onPress={onNextPage}
// //           >
// //             Next
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {topContent}
//       <Table
//         aria-label="User Management Table"
//         pagination
//         css={{ minWidth: "100%" }}
//       >
//         <TableHeader>
//           <TableColumn key="name">Name</TableColumn>
//           <TableColumn key="email">Email</TableColumn>
//           <TableColumn key="role">Role</TableColumn>
//           <TableColumn key="status">Status</TableColumn>
//           <TableColumn key="createdAt">Created At</TableColumn>
//           <TableColumn key="assignrole">Assign Role</TableColumn>
//           <TableColumn key="actions">Actions</TableColumn>
//         </TableHeader>
//         <TableBody items={paginatedUsers}>
//           {(user) => (
//             <TableRow key={user.id}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(user, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       {/* <Pagination
//         total={totalPages}
//         page={page}
//         onChange={(newPage) => setPage(newPage)}
//         className="mt-4"
//       /> */}
//       {bottomContent}
//     </div>
//   );
// }

//og table from NExtUI
// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Chip,
//   User,
//   Pagination,
//   Selection,
//   ChipProps,
//   SortDescriptor,
// } from "@nextui-org/react";
// import { PlusIcon } from "./PlusIcon";
// import { VerticalDotsIcon } from "./VerticalDotsIcon";
// import { ChevronDownIcon } from "./ChevronDownIcon";
// import { SearchIcon } from "./SearchIcon";
// import { columns, users, statusOptions } from "./data";
// import { capitalize } from "./utils";

// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

// type User = (typeof users)[0];

// export default function UserTable() {
//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
//     new Set([])
//   );
//   const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
//     new Set(INITIAL_VISIBLE_COLUMNS)
//   );
//   const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: "age",
//     direction: "ascending",
//   });

//   const [page, setPage] = React.useState(1);

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;

//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid)
//     );
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredUsers = [...users];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase())
//       );
//     }
//     if (
//       statusFilter !== "all" &&
//       Array.from(statusFilter).length !== statusOptions.length
//     ) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status)
//       );
//     }

//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a: User, b: User) => {
//       const first = a[sortDescriptor.column as keyof User] as number;
//       const second = b[sortDescriptor.column as keyof User] as number;
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
//     const cellValue = user[columnKey as keyof User];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{ radius: "lg", src: user.avatar }}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//             <p className="text-bold text-tiny capitalize text-default-400">
//               {user.team}
//             </p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip
//             className="capitalize"
//             color={statusColorMap[user.status]}
//             size="sm"
//             variant="flat"
//           >
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex justify-end items-center gap-2">
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button isIconOnly size="sm" variant="light">
//                   <VerticalDotsIcon className="text-default-300" />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu>
//                 <DropdownItem>View</DropdownItem>
//                 <DropdownItem>Edit</DropdownItem>
//                 <DropdownItem>Delete</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   const onNextPage = React.useCallback(() => {
//     if (page < pages) {
//       setPage(page + 1);
//     }
//   }, [page, pages]);

//   const onPreviousPage = React.useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);

//   const onRowsPerPageChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     []
//   );

//   const onSearchChange = React.useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const onClear = React.useCallback(() => {
//     setFilterValue("");
//     setPage(1);
//   }, []);

//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[44%]"
//             placeholder="Search by name..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => onClear()}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {statusOptions.map((status) => (
//                   <DropdownItem key={status.uid} className="capitalize">
//                     {capitalize(status.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem key={column.uid} className="capitalize">
//                     {capitalize(column.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button color="primary" endContent={<PlusIcon />}>
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">
//             Total {users.length} users
//           </span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     onRowsPerPageChange,
//     users.length,
//     hasSearchFilter,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <span className="w-[30%] text-small text-default-400">
//           {selectedKeys === "all"
//             ? "All items selected"
//             : `${selectedKeys.size} of ${filteredItems.length} selected`}
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="primary"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   return (
//     <Table
//       aria-label="Example table with custom cells, pagination and sorting"
//       isHeaderSticky
//       bottomContent={bottomContent}
//       bottomContentPlacement="outside"
//       classNames={{
//         wrapper: "max-h-[382px]",
//       }}
//       selectedKeys={selectedKeys}
//       selectionMode="multiple"
//       sortDescriptor={sortDescriptor}
//       topContent={topContent}
//       topContentPlacement="outside"
//       onSelectionChange={setSelectedKeys}
//       onSortChange={setSortDescriptor}
//     >
//       <TableHeader columns={headerColumns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === "actions" ? "center" : "start"}
//             allowsSorting={column.sortable}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody emptyContent={"No users found"} items={sortedItems}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(item, columnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

// "use client";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";

// const users = [
//   { id: 1, name: "John Doe", role: "Admin", status: "Active" },
//   { id: 2, name: "Jane Smith", role: "User", status: "Inactive" },
//   { id: 3, name: "Alice Johnson", role: "User", status: "Active" },
// ];

// export function UserTable() {
//   return (
//     <Table aria-label="User Management Table" className="bg-white shadow-md">
//       <TableHeader>
//         <TableColumn>ID</TableColumn>
//         <TableColumn>NAME</TableColumn>
//         <TableColumn>ROLE</TableColumn>
//         <TableColumn>STATUS</TableColumn>
//       </TableHeader>
//       <TableBody>
//         {users.map((user) => (
//           <TableRow key={user.id}>
//             <TableCell>{user.id}</TableCell>
//             <TableCell>{user.name}</TableCell>
//             <TableCell>{user.role}</TableCell>
//             <TableCell>{user.status}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
