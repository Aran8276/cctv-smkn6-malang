"use client";

import React, { useState } from "react";
import SidebarView from "./Sidebar.view";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const [text] = useState("CCTV SMKN6");
  return <SidebarView pathName={pathName} text={text} />;
};

export default Sidebar;
