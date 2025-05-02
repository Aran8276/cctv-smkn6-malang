import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface DashboardCardProps {
  heading: string;
  amount: number;
  bottomText?: string;
  PrimaryIcon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  SecondaryIcon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  primaryIconColor: string;
  secondaryIconColor: string;
}
