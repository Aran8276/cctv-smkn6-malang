"use client";

import React, { useCallback, useEffect, useState } from "react";
import SidebarView from "./Sidebar.view";
import { usePathname } from "next/navigation";
import {
  navItemsAdmin,
  navItemsKepsek,
  navItemsSecurity,
} from "./Sidebar.data";
import { client } from "@/utils/client";
import {
  GetUserResponse,
  LogoutResponse,
  NavItems,
  User,
} from "./Sidebar.type";
import { AxiosError } from "axios";

const Sidebar = () => {
  const [navItems, setNavItems] = useState<NavItems[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const pathName = usePathname();
  const [text] = useState("CCTV SMKN6");

  const getNavRoles = useCallback(() => {
    if (user?.role === "admin") {
      setNavItems(navItemsAdmin);
    } else if (user?.role === "kepsek") {
      setNavItems(navItemsKepsek);
    } else if (user?.role === "security") {
      setNavItems(navItemsSecurity);
    }
  }, [user]);

  const getUser = async () => {
    try {
      const res: GetUserResponse = (await client.get("/api/auth/me")).data;
      if (res.user) {
        setUser(res.user);
      }
    } catch (error) {
      console.error("Gagal mengambil dataset:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res: LogoutResponse = (await client.post("/api/auth/logout")).data;

      if (res.message === "Logout successful") {
        location.replace("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getNavRoles();
  }, [user, getNavRoles]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SidebarView
      handleLogout={handleLogout}
      navItems={navItems}
      user={user}
      pathName={pathName}
      text={text}
    />
  );
};

export default Sidebar;
