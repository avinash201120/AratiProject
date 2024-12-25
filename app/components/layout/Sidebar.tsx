"use client";

import {
  Calendar,
  Home,
  Users,
  File,
  MessageSquare,
  AlertTriangle,
  Settings,
} from "lucide-react";

const adminMenu = [
  { title: "Dashboard", path: "/dashboard/admin", icon: Home },
  { title: "User Management", path: "/dashboard/admin/users", icon: Users },
  { title: "Trade Management", path: "/dashboard/admin/trades", icon: File },
  {
    title: "Donation Management",
    path: "/dashboard/admin/donations",
    icon: File,
  },
  { title: "Sales Management", path: "/dashboard/admin/sales", icon: File },
  { title: "Messages", path: "/dashboard/admin/messages", icon: MessageSquare },
  { title: "Alerts", path: "/dashboard/admin/alerts", icon: AlertTriangle },
  {
    title: "Platform Settings",
    path: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {adminMenu.map((item) => (
            <li key={item.title}>
              <a
                href={item.path}
                className="flex items-center space-x-2 hover:underline"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
