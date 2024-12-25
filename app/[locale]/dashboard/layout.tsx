"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
// import { Sidebar } from "@/app/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="m-1 w-dvw">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>

      {/* Main Content */}
      {/* <main className="flex-1 p-6 bg-gray-100">{children}</main> */}
    </div>
  );
}
