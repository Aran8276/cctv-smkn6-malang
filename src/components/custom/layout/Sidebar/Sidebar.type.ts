import { LucideProps } from "lucide-react";

export interface SidebarProps {
  text: string;
  pathName: string | null;
  navItems:
    | {
        title: string;
        url: string;
        icon: React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >;
      }[]
    | undefined;
}
