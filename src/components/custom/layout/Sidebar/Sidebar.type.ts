import { LucideProps } from "lucide-react";

export interface NavItems {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface SidebarProps {
  handleLogout: () => void;
  user: User | null;
  text: string;
  pathName: string | null;
  navItems: NavItems[] | undefined;
}

export interface GetUserResponse {
  message: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LogoutResponse {
  message: string;
}
