import Sidebar from "@/components/custom/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { memo, ReactNode } from "react";

export default memo(function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Sidebar />
        <main className="min-h-screen w-full p-10 bg-gray-50">{children}</main>
      </SidebarProvider>
    </>
  );
});
