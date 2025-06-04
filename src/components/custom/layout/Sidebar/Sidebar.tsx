"use client";

import React, { useState } from "react";
import SidebarView from "./Sidebar.view";
import { usePathname } from "next/navigation";
import {
  navItemsAdmin,
  navItemsKepsek,
  navItemsSecurity,
} from "./Sidebar.data";

const Sidebar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const [text] = useState("CCTV SMKN6");
  // edit role disini yah sementara
  const [role] = useState<"security" | "admin" | "kepsek">("admin");

  const getNavRoles = (role: "security" | "admin" | "kepsek") => {
    if (role === "admin") {
      return navItemsAdmin;
    } else if (role === "kepsek") {
      return navItemsKepsek;
    } else if (role === "security") {
      return navItemsSecurity;
    }
  };
  return (
    <SidebarView navItems={getNavRoles(role)} pathName={pathName} text={text} />
  );
};

export default Sidebar;
