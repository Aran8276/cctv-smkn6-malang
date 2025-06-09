import React, { FC } from "react";
import { SidebarProps } from "./Sidebar.type";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { secondaryNavItems } from "./Sidebar.data";
import { Bird } from "lucide-react";
import Link from "next/link";
import { NavUser } from "./sub/NavUser";

const SidebarView: FC<SidebarProps> = ({
  text,
  pathName,
  navItems,
  user,
  handleLogout,
}) => {
  return (
    <Sidebar>
      <SidebarHeader className="px-4">
        <SidebarGroupLabel className="flex space-x-3 py-10 text-white">
          <div>
            <Bird size={26} />
          </div>
          <h3 className="font-semibold text-xl">{text}</h3>
        </SidebarGroupLabel>{" "}
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {Array.isArray(navItems) &&
                navItems?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <>
                      {item.url === pathName ? (
                        <SidebarMenuButton
                          className="py-5 px-4 transition-all"
                          isActive
                          asChild
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          className="py-5 px-4 transition-all"
                          asChild
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-8">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <>
                    {item.url === pathName ? (
                      <SidebarMenuButton
                        className="py-5 px-4 transition-all"
                        isActive
                        asChild
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        className="py-5 px-4 transition-all"
                        asChild
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4">
          <NavUser
            handleLogout={handleLogout}
            user={{
              name: user?.username || "-",
              email: user?.email || "-",
              avatar: "-",
            }}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarView;
